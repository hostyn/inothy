import { firestoreAdmin } from '@config/firebaseadmin'
import withAuth from '@middleware/withAuth'
import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { FirestoreTransaction } from 'types/firestore'

async function getTransacition(
  userUID: string,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { transactionId } = req.query

  if (typeof transactionId !== 'string') {
    res.status(400).json({ success: false, error: 'transaction-id-required' })
    return
  }

  const transactionSnapshot = await firestoreAdmin
    .collection('transactions')
    .doc(transactionId)
    .get()

  if (!transactionSnapshot.exists) {
    res.status(404).json({ success: false, error: 'not-found' })
    return
  }

  const transactionData = transactionSnapshot.data() as FirestoreTransaction

  if (transactionData.author !== userUID) {
    res.status(401).json({ success: false, error: 'unauthorized' })
    return
  }

  res.status(200).json(transactionData)
}

export default withMethod('GET', withAuth(getTransacition))
