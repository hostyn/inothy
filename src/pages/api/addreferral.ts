import { firestoreAdmin } from '@config/firebaseadmin'
import withAuthFullData from '@middleware/withAuthFullData'
import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'
import type { FirestoreReferral } from 'types/firestore'

async function addReferral(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { ref } = JSON.parse(req.body)

  if (typeof ref !== 'string') {
    res.status(400).json({ success: false, error: 'ref-required' })
    return
  }

  const userRefReference = firestoreAdmin.collection('referrals').doc(user.uid)
  const userRefSnapshot = await userRefReference.get()

  if (userRefSnapshot.exists) {
    res.status(200).json({ success: false, error: 'already-referred' })
    return
  }

  const referral: FirestoreReferral = {
    ref,
  }

  await userRefReference.set(referral)

  res.status(201).json({ success: true })
}

export default withMethod('POST', withAuthFullData(addReferral))
