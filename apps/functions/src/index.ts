import * as functions from 'firebase-functions'
import { createOrUpdateContact, sendTemplateEmail } from './brevo'
import { mangopay, prisma } from './services'
import { generateUsername } from './util'
import admin from 'firebase-admin'

admin.initializeApp()

export const onRegister = functions
  .runWith({
    secrets: ['DATABASE_URL', 'BREVO_API_KEY', 'NEXT_PUBLIC_FRONTEND_URL'],
  })
  .region('europe-west1')
  .auth.user()
  .onCreate(async user => {
    const username = await generateUsername()

    await prisma.user.create({
      data: {
        uid: user.uid,
        username,
      },
    })

    try {
      const { id } = await createOrUpdateContact(user.email as string, {
        USERNAME: username,
        SIGNUP_DATE: new Date().toISOString().split('T')[0],
      })

      await prisma.user.update({
        where: {
          uid: user.uid,
        },
        data: {
          brevoId: String(id),
        },
      })
    } catch (error) {
      functions.logger.error('Error creating brevo contact --', error)
    }

    if (!user.emailVerified) {
      try {
        const verificationUrl = await admin
          .auth()
          .generateEmailVerificationLink(user.email as string, {
            url: process.env.NEXT_PUBLIC_FRONTEND_URL as string,
          })

        await sendTemplateEmail(5, user.email as string, {
          url: verificationUrl,
        })
      } catch (error) {
        functions.logger.error('Error sending verification email --', error)
      }
    }

    functions.logger.info('User created:', user.email, user.uid)
  })

export const kycWebhook = functions
  .runWith({
    secrets: [
      'DATABASE_URL',
      'MANGOPAY_API_KEY',
      'MANGOPAY_CLIENT_ID',
      'MANGOPAY_ENDPOINT',
    ],
  })
  // req.query =
  // {
  //   RessourceId: mangopayKycDocumentId,
  //   EventType: KYC_SUCCEEDED | KYC_FAILED | KYC_OUTDATED,
  //   Date: date in seconds -> new Date(date * 1000)
  // }
  .region('europe-west1')
  .https.onRequest(async (req, res) => {
    try {
      const kycDocument = req.query.RessourceId

      if (typeof kycDocument !== 'string') {
        res.status(400).send('RessourceId_required')
        return
      }

      // const eventType = req.query.EventType // KYC_SUCCEEDED | KYC_FAILED | KYC_OUTDATED
      // TODO: send transactional email to user

      const mangopayKycDocument = await mangopay.KycDocuments.get(kycDocument)

      const user = await mangopay.Users.get(mangopayKycDocument.UserId)

      await prisma.mangopayUser.update({
        where: {
          mangopayId: user.Id,
        },
        data: {
          kycLevel: user.KYCLevel,
          kycId: mangopayKycDocument.Id,
          kycStatus: mangopayKycDocument.Status,
          kycRefusedReasonMessage: mangopayKycDocument.RefusedReasonMessage,
          kycRefusedReasonType: mangopayKycDocument.RefusedReasonType,
          userType: user.UserCategory,
        },
      })

      res.send('done')
    } catch (error) {
      console.error(error)
      res.status(500).send('internal_server_error')
    }
  })
