import { authAdmin } from 'config/firebaseadmin'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function withAuth(
  handler: (userUID: string, req: NextApiRequest, res: NextApiResponse) => any
): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.headers.authorization == null) {
      res.status(401).json({ success: false, error: 'unauthorized' })
      return
    }

    const authorizationToken = req.headers.authorization.split(' ')[1]

    try {
      const { uid } = await authAdmin.verifyIdToken(authorizationToken)
      handler(uid, req, res)
    } catch {
      res.status(401).json({ success: false, error: 'unauthorized' })
    }
  }
}
