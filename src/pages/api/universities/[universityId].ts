import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { School, University, UniversityWithSchools } from 'types/api'
import { firestoreAdmin } from '../../../config/firebaseadmin'

async function getSchools(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { universityId } = req.query

    if (typeof universityId !== 'string') {
      res.status(400).json({ success: false, error: 'university-id-required' })
      return
    }

    const universityReference = firestoreAdmin
      .collection('universities')
      .doc(universityId)

    const univeristySnapshot = await universityReference.get()

    if (!univeristySnapshot.exists) {
      res.status(404).json({ success: false, error: 'university-not-found' })
      return
    }

    const universityData = univeristySnapshot.data() as University

    const schoolsSnapshot = await universityReference
      .collection('schools')
      .orderBy('name')
      .get()

    const schools = schoolsSnapshot.docs.map(doc => {
      const school: School = {
        ...(doc.data() as { name: string }),
        id: doc.id,
      }
      return school
    })

    const universityWithSchools: UniversityWithSchools = {
      ...universityData,
      schools,
    }

    res.status(200).json(universityWithSchools)
  } catch {
    res.status(500).json({ success: false, error: 'unexpected-exception' })
  }
}

export default withMethod('GET', getSchools)
