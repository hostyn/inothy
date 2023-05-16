import type { NextApiRequest, NextApiResponse } from 'next'
import { firestoreAdmin } from 'config/firebaseadmin'
import withMethod from '@middleware/withMethod'
import type { Degree, DegreeWithDocuments } from 'types/api'
import type { FirestoreDocument } from 'types/firestore'

async function getDegree(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { universityId, schoolId, degreeId, year: queryYear } = req.query

  if (typeof universityId !== 'string') {
    res.status(400).json({ success: false, error: 'university-id-required' })
    return
  }

  if (typeof schoolId !== 'string') {
    res.status(400).json({ success: false, error: 'school-id-required' })
    return
  }

  if (typeof degreeId !== 'string') {
    res.status(400).json({ success: false, error: 'degree-id-required' })
    return
  }

  if (typeof queryYear === 'object') {
    res.status(400).json({ success: false, error: 'invalid-year' })
    return
  }

  const year = typeof queryYear === 'string' ? parseInt(queryYear) : null

  const degreeSnapshot = await firestoreAdmin
    .collection('universities')
    .doc(universityId)
    .collection('schools')
    .doc(schoolId)
    .collection('degrees')
    .doc(degreeId)
    .get()

  if (!degreeSnapshot.exists) {
    res.status(404).json({ success: false, error: 'not-found' })
    return
  }

  const degreeData = degreeSnapshot.data() as Degree

  const subjects = await Promise.all(
    degreeData.subjects
      .filter(subject => year == null || subject.year === year)
      .map(async subject => {
        const documentsQuerySnapshot = await firestoreAdmin
          .collection('subjects')
          .doc(subject.id)
          .collection('docs')
          .limit(5)
          .get()

        if (documentsQuerySnapshot.empty) return { ...subject, docs: [] }

        const docs = documentsQuerySnapshot.docs.map(document => {
          const documentData = document.data() as FirestoreDocument
          return {
            ...documentData,
            id: document.id,
            verified: documentData.verificationStatus === 'verificated',
            verificationStatus: undefined,
          }
        })

        return { ...subject, docs }
      })
  )

  const degree: DegreeWithDocuments = {
    ...degreeData,
    id: degreeSnapshot.id,
    subjects,
  }

  res.status(200).json(degree)
}

export default withMethod('GET', getDegree)
