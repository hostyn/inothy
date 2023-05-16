import { firestoreAdmin } from '@config/firebaseadmin'
import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'

async function isUsernameAvailable(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { username } = req.query

  if (typeof username !== 'string') {
    res.status(400).json({ success: false, error: 'username-required' })
  }

  const usernameQuerySnapshot = await firestoreAdmin
    .collection('users')
    .where('username', '==', username)
    .get()

  if (usernameQuerySnapshot.empty) {
    res.status(200).json({ success: true, available: true })
    return
  }

  res.status(200).json({ success: true, available: false })
}

export default withMethod('GET', isUsernameAvailable)
