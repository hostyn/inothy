import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestoreAdmin } from '../../../config/firebaseadmin'

async function getUniversities(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const querySnapshot = await firestoreAdmin
      .collection('universities')
      .orderBy('name')
      .get()

    const universities = querySnapshot.docs.map(doc => {
      return {
        ...doc.data(),
        id: doc.id,
      }
    })

    res.status(200).json(universities)
    return
  } catch {
    res.status(500).json({ success: false, error: 'unexpected-exception' })
  }
}

export default withMethod('GET', getUniversities)
