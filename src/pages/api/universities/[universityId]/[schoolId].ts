import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Degree, School, SchoolWithDegree } from 'types/api'
import { firestoreAdmin } from '@config/firebaseadmin'

async function getDegrees(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { universityId, schoolId } = req.query

  if (typeof universityId !== 'string') {
    res.status(400).json({ success: false, error: 'university-id-required' })
    return
  }

  if (typeof schoolId !== 'string') {
    res.status(400).json({ success: false, error: 'school-id-required' })
    return
  }

  const schoolReference = firestoreAdmin
    .collection('universities')
    .doc(universityId)
    .collection('schools')
    .doc(schoolId)

  const schoolSnapshot = await schoolReference.get()

  if (!schoolSnapshot.exists) {
    res.status(404).json({ success: false, error: 'not-found' })
    return
  }

  const schoolData = schoolSnapshot.data() as School

  const degreesData = await schoolReference
    .collection('degrees')
    .orderBy('name')
    .get()

  const degrees = degreesData.docs.map(doc => {
    const degree: Degree = { ...(doc.data() as Degree), id: doc.id }
    return degree
  })

  const school: SchoolWithDegree = { ...schoolData, id: schoolId, degrees }

  res.status(200).json(school)
}

export default withMethod('GET', getDegrees)
