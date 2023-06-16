import { firestoreAdmin } from '@config/firebaseadmin'
import { type UserRecord } from 'firebase-admin/lib/auth/user-record'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'
import type { FirestoreUser } from 'types/firestore'
import withAuthData from './withAuthData'

export default function withAuthFullData(
  handler: (user: ApiUser, req: NextApiRequest, res: NextApiResponse) => any
): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
  return withAuthData(
    async (user: UserRecord, req: NextApiRequest, res: NextApiResponse) => {
      const doc = await firestoreAdmin.collection('users').doc(user.uid).get()

      if (doc.exists) {
        const userData = doc.data() as FirestoreUser
        const apiUser: ApiUser = { ...user, data: userData }
        await handler(apiUser, req, res)
        return
      }
      res.status(401).json({ success: false, error: 'unauthorized' })
    }
  )
}
