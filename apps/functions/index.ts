/* eslint-disable @typescript-eslint/no-var-requires */
import { PrismaClient } from '@prisma/client'
import * as functions from 'firebase-functions'
import MangoPay from 'mangopay2-nodejs-sdk'

const mangopay = new MangoPay({
  clientId: process.env.MANGOPAY_CLIENT_ID as string,
  clientApiKey: process.env.MANGOPAY_API_KEY as string,
  baseUrl: process.env.MANGOPAY_ENDPOINT,
})

const client = new PrismaClient({
  log: ['info', 'query', 'warn'],
})

const isUsernameAvailable = async (username: string): Promise<boolean> => {
  const user = await client.user.findUnique({
    where: {
      username,
    },
  })
  return user === null
}

const generateUsername = async (): Promise<string> => {
  const allowedCharacter =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let username = 'user_'
  for (let i = 0; i < 6; i++) {
    const caracterAleatorio =
      allowedCharacter[Math.floor(Math.random() * allowedCharacter.length)]
    username += caracterAleatorio
  }

  if (await isUsernameAvailable(username)) return username
  return await generateUsername()
}

export const onRegister = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async user => {
    const username = await generateUsername()

    await client.user.create({
      data: {
        uid: user.uid,
        username,
      },
    })
  })

export const kycWebhook = functions
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

      await client.mangopayUser.update({
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
