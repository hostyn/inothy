import mangopay from '@config/mangopay'
import { firestoreAdmin } from '@config/firebaseadmin'
import { getSellerAmount } from '@util/priceCalculator'
import withMethod from '@middleware/withMethod'
import withAuthFullData from '@middleware/withAuthFullData'
import type { ApiUser } from 'types/api'
import type { NextApiRequest, NextApiResponse } from 'next'
import type {
  FirestoreDocument,
  FirestoreRecipt,
  FirestoreTransaction,
  FirestoreUser,
} from 'types/firestore'
import { FRONTEND_URL } from '@config/constants'

async function buy(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const body = JSON.parse(req.body)

  if (typeof body.products !== 'object') {
    res.status(400).json({ success: false, error: 'products-required' })
    return
  }

  const documents = await Promise.all(
    body.products.map(async (product: string) => {
      const [subjectId, documentId] = product.split('/')
      const data = (
        await firestoreAdmin
          .collection('subjects')
          .doc(subjectId)
          .collection('docs')
          .doc(documentId)
          .get()
      ).data() as FirestoreDocument

      return { ...data, subjectId, documentId, path: product }
    })
  )

  const userDontOwnAnyProduct = documents.every(
    doc => doc.createdBy !== user.uid
  )

  if (!userDontOwnAnyProduct) {
    res.status(400).json({ success: false, error: 'propietary-documents' })
    return
  }

  const userDontBoughtAnyProductYet = documents.every(doc =>
    user.data.bought != null ? !user.data.bought.includes(doc.path) : true
  )

  if (!userDontBoughtAnyProductYet) {
    res.status(400).json({ success: false, error: 'already-bought' })
    return
  }

  const isAmbassador = user.data.badge?.includes('ambassador') ?? false
  const isDiscountActive = new Date() < new Date('07-01-2023')

  const totalPrice = documents.reduce(
    (prev: number, current) =>
      isAmbassador
        ? prev + parseFloat(current.price) * 0.8
        : isDiscountActive
        ? prev + parseFloat(current.price) * 0.9
        : prev + parseFloat(current.price),
    0
  )

  const forwardedFor = req.headers['x-forwarded-for'] as string | undefined
  const ipAddress = forwardedFor?.split(',')[0] ?? '127.0.0.1'

  const createPayInResponse = await mangopay.PayIns.create({
    AuthorId: user.data.mangopayClientId ,
    CreditedWalletId: user.data.mangopayWalletId ,
    PaymentType: 'CARD',
    ExecutionType: 'DIRECT',
    DebitedFunds: {
      Currency: 'EUR',
      Amount: totalPrice * 100,
    },
    Fees: {
      Currency: 'EUR',
      Amount: 0,
    },
    SecureModeReturnURL: FRONTEND_URL + '/completepay',
    CardId: body.cardId,
    SecureMode: 'DEFAULT',
    IpAddress: ipAddress,
    BrowserInfo: {
      AcceptHeader: body.acceptHeader,
      JavaEnabled: body.javaEnabled,
      Language: body.language,
      ColorDepth: body.colorDepth,
      ScreenHeight: body.screenHeight,
      ScreenWidth: body.screenWidth,
      TimeZoneOffset: body.timezoneOffset,
      UserAgent: body.userAgent,
      JavascriptEnabled: true,
    },
  })

  if (createPayInResponse.Status === 'CREATED') {
    // If transaction trigger a challenge
    const transaction: FirestoreTransaction = {
      author: user.uid,
      authorId: createPayInResponse.AuthorId,
      authorWalletId: user.data.mangopayWalletId ,
      payInId: createPayInResponse.Id,
      creationDate: createPayInResponse.CreationDate * 1000,
      amount: totalPrice,
      status: createPayInResponse.Status,
      cardId: createPayInResponse.CardId,
      recipts: documents.map(document => ({
        path: document.path,
        price: isAmbassador
          ? document.price * 0.8
          : isDiscountActive
          ? document.price * 0.9
          : document.price,
        fee:
          (isAmbassador
            ? document.price * 0.8
            : isDiscountActive
            ? document.price * 0.9
            : document.price) - getSellerAmount(document.price),
        createdBy: document.createdBy,
      })),
    }

    await firestoreAdmin
      .collection('transactions')
      .doc(createPayInResponse.Id)
      .set(transaction)

    res.status(200).json({
      success: true,
      status: createPayInResponse.Status,
      redirectUrl: createPayInResponse.SecureModeRedirectURL,
    })
    return
  }

  if (createPayInResponse.Status === 'SUCCEEDED') {
    // If transaction goes frictionless
    const recipts = await Promise.all(
      documents.map(async document => {
        const ownerData = (
          await firestoreAdmin.collection('users').doc(document.createdBy).get()
        ).data() as FirestoreUser

        const recipt = await mangopay.Transfers.create({
          AuthorId: user.data.mangopayClientId ,
          DebitedWalletId: user.data.mangopayWalletId ,
          CreditedWalletId: ownerData.mangopayWalletId ,
          DebitedFunds: {
            Currency: 'EUR',
            Amount:
              (isAmbassador
                ? document.price * 0.8
                : isDiscountActive
                ? document.price * 0.9
                : document.price) * 100,
          },
          Fees: {
            Currency: 'EUR',
            Amount:
              ((isAmbassador
                ? document.price * 0.8
                : isDiscountActive
                ? document.price * 0.9
                : document.price) -
                getSellerAmount(document.price)) *
              100,
          },
        })

        const documentRef = firestoreAdmin
          .collection('subjects')
          .doc(document.subjectId)
          .collection('docs')
          .doc(document.docId)

        await firestoreAdmin.runTransaction(async transaction => {
          const documentSnapshot = await transaction.get(documentRef)
          const documentData = documentSnapshot.data() as FirestoreDocument
          transaction.update(documentRef, {
            sales: documentData.sales + 1,
          })
        })

        const ownerRef = firestoreAdmin
          .collection('users')
          .doc(document.createdBy)

        await firestoreAdmin.runTransaction(async transaction => {
          const ownerSnapshot = await transaction.get(ownerRef)
          const ownerData = ownerSnapshot.data() as FirestoreUser
          transaction.update(ownerRef, {
            sales: ownerData.sales != null ? ownerData.sales + 1 : 1,
            badge:
              ownerData.sales != null
                ? ownerData.sales + 1 === 500
                  ? [...(ownerData.badge ?? []), 'gold']
                  : ownerData.sales + 1 === 200
                  ? [...(ownerData.badge ?? []), 'silver']
                  : ownerData.sales + 1 === 50
                  ? [...(ownerData.badge ?? []), 'bronze']
                  : ownerData.badge
                : ownerData.badge,
          })
        })

        const reciptData: FirestoreRecipt = {
          path: document.path,
          price: document.price,
          createdBy: document.createdBy,
          transactionId: recipt.Id,
          creationDate: recipt.CreationDate * 1000,
          fee: recipt.Fees.Amount / 100,
        }

        return reciptData
      })
    )

    const transaction: FirestoreTransaction = {
      author: user.uid,
      authorId: createPayInResponse.AuthorId,
      authorWalletId: user.data.mangopayWalletId ,
      payInId: createPayInResponse.Id,
      creationDate: createPayInResponse.CreationDate,
      amount: totalPrice,
      status: createPayInResponse.Status,
      cardId: createPayInResponse.CardId,
      recipts,
    }

    await firestoreAdmin
      .collection('transactions')
      .doc(createPayInResponse.Id)
      .set(transaction)

    await firestoreAdmin
      .collection('users')
      .doc(user.uid)
      .update({
        bought:
          user.data.bought != null
            ? [...user.data.bought, ...body.products]
            : body.products,
      })

    res.status(200).json({ success: true, status: createPayInResponse.Status })
    return
  }

  res.status(500).json({ success: false, error: 'unexpected-exception' })
}

export default withMethod('POST', withAuthFullData(buy))
