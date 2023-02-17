import { authAdmin, firestoreAdmin } from '../../config/firebaseadmin'

export default async function schools (req, res) {
  if (req.method !== 'POST') {
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

  const { ref } = JSON.parse(req.body)

  const userRefReference = firestoreAdmin.collection('referrals').doc(user.uid)
  const userRefSnapshot = await userRefReference.get()

  if (userRefSnapshot.exists) {
    res.status(200).json({ status: 'ok' })
    return
  }

  await userRefReference.set({
    ref
  })

  res.status(200).json({ status: 'ok' })
}
