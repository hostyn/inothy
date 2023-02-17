import { authAdmin, firestoreAdmin } from '../../config/firebaseadmin'
import mangopay from '../../config/mangopay'

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

  const { cardId } = JSON.parse(req.body)

  const cardData = await mangopay.Cards.get(cardId)

  if (userData.mangopayClientId !== cardData.UserId) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  await mangopay.Cards.update({ Id: cardId, Active: false })

  res.status(200).json({ status: 'ok' })
}
