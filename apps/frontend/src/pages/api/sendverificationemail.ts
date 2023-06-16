import { FRONTEND_URL } from '@config/constants'
import { authAdmin } from '@config/firebaseadmin'
import withAuthData from '@middleware/withAuthData'
import withMethod from '@middleware/withMethod'
import { sendVerificationEmail } from '@util/email'
import type { UserRecord } from 'firebase-admin/lib/auth/user-record'
import type { NextApiRequest, NextApiResponse } from 'next'

async function emailVerification(
  user: UserRecord,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (user.emailVerified) {
    res.status(400).json({ success: false, error: 'email-already-verified' })
    return
  }

  if (typeof user.email !== 'string') {
    res.status(400).json({ success: false, error: 'email-already-verified' })
    return
  }

  const actionCodeSettings = {
    url: FRONTEND_URL,
  }

  try {
    const url = await authAdmin.generateEmailVerificationLink(
      user.email,
      actionCodeSettings
    )

    await sendVerificationEmail(user.email, url)
    res.status(200).json({ success: true })
  } catch (error) {
    if (error?.code === 'auth/internal-error') {
      res.status(429).json({ success: false, error: 'too-many-requests' })
      return
    }

    res.status(500).json({ success: false, error: 'unexpected-exception' })
  }
}

export default withMethod('POST', withAuthData(emailVerification))
