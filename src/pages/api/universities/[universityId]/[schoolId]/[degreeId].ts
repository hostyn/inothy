import type { NextApiRequest, NextApiResponse } from 'next'
import { firestoreAdmin } from 'config/firebaseadmin'
import withMethod from '@middleware/withMethod'
import type { Degree } from 'types/api'

async function getDegree(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
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

    const year = typeof queryYear === 'string' ? parseInt(queryYear) : 1

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
        .filter(subject => subject.year === year)
        .map(async subject => {
          const subjectSnapshot = await firestoreAdmin
            .collection('subjects')
            .doc(subject.id)
            .collection('docs')
            .limit(5)
            .get()

          if (subjectSnapshot.empty) return { ...subject, docs: [] }
          const docs = subjectSnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }))

          return { ...subject, docs }
        })
    )

    res.status(200).json({
      ...degreeData,
      id: degreeSnapshot.id,
      subjects: subjects.filter(subject => subject.docs.length !== 0),
    })

    return
  } catch {
    res.status(500).json({ success: false, error: 'unexpected-exception' })
  }
}

export default withMethod('GET', getDegree)
