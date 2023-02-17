import { authAdmin, firestoreAdmin } from '../../config/firebaseadmin'

export default async function getUserData (req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = req.headers.authorization.split(' ')[1]
  let user
  try {
    user = await authAdmin.verifyIdToken(token)
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  const doc = await firestoreAdmin.collection('users').doc(user.uid).get()

  if (doc.exists) {
    res.status(200).json(doc.data())
    return
  }
  res.status(404).json({ error: 'User not found' })
}
