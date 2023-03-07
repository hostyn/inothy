import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { UniversityWithSchools } from 'types/api'
import { firestoreAdmin } from '@config/firebaseadmin'

async function getSchools(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
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

  const universityData = univeristySnapshot.data() as FirestoreUniversity

  const schoolsSnapshot = await universityReference
    .collection('schools')
    .orderBy('name')
    .get()

  const schools = schoolsSnapshot.docs.map(schoolSnapshot => {
    const school = {
      ...(schoolSnapshot.data() as FirestoreSchool),
      id: schoolSnapshot.id,
    }
    return school
  })

  const universityWithSchools: UniversityWithSchools = {
    ...universityData,
    id: univeristySnapshot.id,
    schools,
  }

  res.status(200).json(universityWithSchools)
}

export default withMethod('GET', getSchools)
