import admin from '../../config/firebaseadmin'
import { sendVerificationEmail } from '../../util/email'

export default async function emailVerification (req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = req.headers.authorization.split(' ')[1]
  const user = await admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      res.status(401).json({ error: 'Unauthorized' })
    })

  if (user.email_verified) {
    res.status(202).json({ message: 'Email already verified' })
    return
  }

  const actionCodeSettings = {
    url: process.env.NEXT_PUBLIC_FRONTEND_URL
  }

  let url
  try {
    url = await admin
      .auth()
      .generateEmailVerificationLink(user.email, actionCodeSettings)
  } catch (error) {
    res.status(400).json({ error })
    return
  }

  try {
    await sendVerificationEmail(user.email, url)
    res.status(200).json({ message: 'Email sent' })
    return
  } catch (e) {
    res.status(500).json({ error: 'Email not sent' })
  }
}
