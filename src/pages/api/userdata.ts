import type { NextApiRequest, NextApiResponse } from 'next'
import { authAdmin, firestoreAdmin } from '../../config/firebaseadmin'

export interface UserData {
  address?: {
    address1?: string
    address2?: string
    city?: string
    postalCode?: string
    region?: string
  }
  badge?: string[]
  biography?: string
  createdAt?: string
  degree?: string
  email?: string
  ipAddress?: string
  mangopayClientId?: string
  mangopayKYCStatus?: string | null
  mangopayWalletId?: string | null
  name?: string
  profileCompleted?: boolean
  ref?: string
  school?: string
  surname?: string
  uid: string
  university?: string
  username?: string
}

export default async function getUserData(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  if (req.headers.authorization == null) {
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
    const userData = doc.data() as UserData
    res.status(200).json(userData)
    return
  }
  res.status(404).json({ error: 'User not found' })
}
