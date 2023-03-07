import { authAdmin } from '@config/firebaseadmin'
import withMethod from '@middleware/withMethod'
import { sendPasswordResetEmail } from '@util/email'
import type { NextApiRequest, NextApiResponse } from 'next'
import { FRONTEND_URL } from '@config/constants'

async function resetPassword(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email } = JSON.parse(req.body)

  if (typeof email !== 'string') {
    res.status(400).json({ success: false, error: 'email-required' })
    return
  }

  const actionCodeSettings = {
    url: FRONTEND_URL,
  }

  try {
    const url = await authAdmin.generatePasswordResetLink(
      email,
      actionCodeSettings
    )
    await sendPasswordResetEmail(email, url)
    res.status(200).json({ status: 'success' })
    return
  } catch {
    res.status(400).json({ success: false, error: 'error' })
  }
}

export default withMethod('POST', resetPassword)
