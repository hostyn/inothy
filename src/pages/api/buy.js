import mangopay from '../../config/mangopay'
import { authAdmin, firestoreAdmin } from '../../config/firebaseadmin'
import { getSellerAmount } from '../../util/priceCalculator'

export default async function createcardregistration (req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = req.headers.authorization.split(' ')[1]
  const user = await authAdmin.verifyIdToken(token).catch((error) => {
    console.log(error)
    res.status(401).json({ error: 'Unauthorized' })
  })

  const userData = (
    await firestoreAdmin.collection('users').doc(user.uid).get()
  ).data()

  const body = JSON.parse(req.body)

  const documents = await Promise.all(
    body.products.map(async (doc) => {
      const [subjectId, docId] = doc.split('/')
      const data = (
        await firestoreAdmin
          .collection('subjects')
          .doc(subjectId)
          .collection('docs')
          .doc(docId)
          .get()
      ).data()
      return { ...data, subjectId, docId, path: doc }
    })
  )

  let valid = documents.every((doc) => doc.createdBy !== user.uid)
  if (!valid) {
    res.status(400).json({ error: 'Can not buy your own documents' })
    return
  }

  valid = documents.every((doc) =>
    userData.bought ? !userData.bought.includes(doc.path) : true
  )
  if (!valid) {
    res.status(400).json({ error: 'Already bought' })
    return
  }

  const isAmbassador = userData.badge?.includes('ambassador')
  const isDiscountActive = new Date() < new Date('07-01-2023')

  const totalPrice = documents.reduce(
    (prev, current) =>
      isAmbassador
        ? prev + parseFloat(current.price) * 0.8
        : isDiscountActive
          ? prev + parseFloat(current.price) * 0.9
          : prev + parseFloat(current.price),
    0
  )

  // TODO: Fix in development
  const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] ?? '127.0.0.1'

  const response = await mangopay.PayIns.create({
    AuthorId: userData.mangopayClientId,
    CreditedWalletId: userData.mangopayWalletId,
    PaymentType: 'CARD',
    ExecutionType: 'DIRECT',
    DebitedFunds: {
      Currency: 'EUR',
      Amount: totalPrice * 100
    },
    Fees: {
      Currency: 'EUR',
      Amount: 0
    },
    SecureModeReturnURL: process.env.NEXT_PUBLIC_FRONTEND_URL + '/completepay',
    CardId: body.cardId,
    SecureMode: 'DEFAULT',
    IpAddress: ipAddress,
    BrowserInfo: {
      AcceptHeader: body.acceptHeaders,
      JavaEnabled: body.javaEnabled,
      Language: body.language,
      ColorDepth: body.colorDepth,
      ScreenHeight: body.screenHeight,
      ScreenWidth: body.screenWidth,
      TimeZoneOffset: body.timezoneOffset,
      UserAgent: body.userAgent,
      JavascriptEnabled: true
    }
  })

  if (response.Status === 'CREATED') {
    await firestoreAdmin
      .collection('transactions')
      .doc(response.Id)
      .set({
        author: user.uid,
        authorId: response.AuthorId,
        authorWalletId: userData.mangopayWalletId,
        payInId: response.Id,
        creationDate: response.CreationDate,
        amount: totalPrice,
        status: response.Status,
        cardId: response.CardId,
        recipts: documents.map((doc) => ({
          path: doc.path,
          price: isAmbassador
            ? doc.price * 0.8
            : isDiscountActive
              ? doc.price * 0.9
              : doc.price,
          fee:
            (isAmbassador
              ? doc.price * 0.8
              : isDiscountActive
                ? doc.price * 0.9
                : doc.price) -
            getSellerAmount(doc.price),
          createdBy: doc.createdBy
        }))
      })
    res
      .status(200)
      .json({ status: 'created', redirectUrl: response.SecureModeRedirectURL })
    return
  }

  if (response.Status === 'SUCCEEDED') {
    const recipts = await Promise.all(
      documents.map(async (document) => {
        const ownerData = (
          await firestoreAdmin.collection('users').doc(document.createdBy).get()
        ).data()

        const recipt = await mangopay.Transfers.create({
          AuthorId: userData.mangopayClientId,
          DebitedWalletId: userData.mangopayWalletId,
          CreditedWalletId: ownerData.mangopayWalletId,
          DebitedFunds: {
            Currency: 'EUR',
            Amount:
              (isAmbassador
                ? document.price * 0.8
                : isDiscountActive
                  ? document.price * 0.9
                  : document.price) * 100
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
              100
          }
        })

        const documentRef = firestoreAdmin
          .collection('subjects')
          .doc(document.subjectId)
          .collection('docs')
          .doc(document.docId)

        firestoreAdmin.runTransaction(async (transaction) => {
          const document = await transaction.get(documentRef)
          transaction.update(documentRef, {
            sales: document.data().sales ? document.data().sales + 1 : 1
          })
        })

        const ownerRef = firestoreAdmin
          .collection('users')
          .doc(document.createdBy)

        firestoreAdmin.runTransaction(async (transaction) => {
          const user = await transaction.get(ownerRef)
          transaction.update(ownerRef, {
            sales: user.data().sales ? user.data().sales + 1 : 1,
            badge:
              user.data().sales + 1 === 500
                ? [...user.data().badge, 'gold']
                : user.data().sales + 1 === 200
                  ? [...user.data().badge, 'silver']
                  : user.data().sales + 1 === 50
                    ? [...user.data().badge, 'bronze']
                    : user.data().badge
          })
        })

        return {
          path: document.path,
          price: document.price,
          createdBy: document.createdBy,
          transactionId: recipt.Id,
          creationDate: recipt.CreationDate,
          fees: recipt.Fees.Amount / 100
        }
      })
    )

    await firestoreAdmin.collection('transactions').doc(response.Id).set({
      author: user.uid,
      authorId: response.AuthorId,
      authorWalletId: userData.mangopayWalletId,
      payInId: response.Id,
      creationDate: response.CreationDate,
      amount: totalPrice,
      status: response.Status,
      cardId: response.CardId,
      recipts
    })

    firestoreAdmin
      .collection('users')
      .doc(user.uid)
      .update({
        bought: userData.bought
          ? [...userData.bought, ...body.products]
          : body.products
      })

    res.status(200).json({ status: 'success' })
    return
  }

  res.status(500).json({ error: 'internal server error' })
}
