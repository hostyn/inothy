import { firestoreAdmin } from '../../../../../config/firebaseadmin'

export default async function degree (req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  try {
    const { universityId, schoolId, degreeId } = req.query
    const degreeSnapshot = await firestoreAdmin
      .collection('universities')
      .doc(universityId)
      .collection('schools')
      .doc(schoolId)
      .collection('degrees')
      .doc(degreeId)
      .get()

    if (!degreeSnapshot.exists) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    const degreeData = degreeSnapshot.data()
    const subjectsPromises = degreeData.subjects.map(async (subject) => {
      if (subject.year !== 1) return { ...subject, docs: null }
      const subjectSnapshot = await firestoreAdmin
        .collection('subjects')
        .doc(subject.id)
        .collection('docs')
        .limit(5)
        .get()
      if (subjectSnapshot.empty) return { ...subject, docs: [] }
      const docs = subjectSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))

      return { ...subject, docs }
    })

    const subjects = await Promise.all(subjectsPromises)

    res.status(200).json({
      ...degreeSnapshot.data(),
      id: degreeSnapshot.id,
      subjects
    })
    return
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}
