import { authAdmin, firestoreAdmin } from '../../config/firebaseadmin'
import mangopay from '../../config/mangopay'

export default async function updatebank (req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = req.headers.authorization.split(' ')[1]
  const user = await authAdmin.verifyIdToken(token).catch((error) => {
    res.status(401).json({ error: 'Unauthorized' })
  })

  const userData = (
    await firestoreAdmin.collection('users').doc(user.uid).get()
  ).data()

  const response = await mangopay.Users.getBankAccounts(
    userData.mangopayClientId,
    {
      parameters: {
        Active: true
      }
    }
  )

  res.status(200).json(response)
}
