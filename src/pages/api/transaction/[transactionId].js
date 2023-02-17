import { authAdmin, firestoreAdmin } from '../../../config/firebaseadmin'

export default async function getTransacition (req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
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

  const { transactionId } = req.query

  const transaction = await firestoreAdmin
    .collection('transactions')
    .doc(transactionId)
    .get()

  if (!transaction.exists) {
    res.status(404).json({ error: 'not found' })
    return
  }

  const transactionData = transaction.data()

  if (transactionData.author !== user.uid) {
    res.status(404).json({ error: 'not found' })
    return
  }

  res.status(200).json(transactionData)
}
