import { authAdmin } from '@config/firebaseadmin'
import { type UserRecord } from 'firebase-admin/lib/auth/user-record'
import type { NextApiRequest, NextApiResponse } from 'next'
import withAuth from './withAuth'

export default function withAuthData(
  handler: (user: UserRecord, req: NextApiRequest, res: NextApiResponse) => any
): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
  return withAuth(
    async (userUID: string, req: NextApiRequest, res: NextApiResponse) => {
      try {
        const user = await authAdmin.getUser(userUID)
        await handler(user, req, res)
      } catch (error) {
        if ((error.code as string).startsWith('auth')) {
          res.status(401).json({ success: false, error: 'unauthorized' })
          return
        }
        console.log(error)
        res.status(500).json({ success: false, error: 'unexpected-error' })
      }
    }
  )
}
