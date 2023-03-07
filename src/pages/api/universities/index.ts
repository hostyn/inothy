import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestoreAdmin } from '@config/firebaseadmin'
import type { University } from 'types/api'

async function getUniversities(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const querySnapshot = await firestoreAdmin
    .collection('universities')
    .orderBy('name')
    .get()

  const universities: University[] = querySnapshot.docs.map(doc => {
    return {
      ...(doc.data() as FirestoreUniversity),
      id: doc.id,
    }
  })

  res.status(200).json(universities)
}

export default withMethod('GET', getUniversities)
