import { firestoreAdmin } from '../../../../config/firebaseadmin'

export default async function degrees (req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  try {
    const { universityId, schoolId } = req.query
    const schoolSnapshot = firestoreAdmin
      .collection('universities')
      .doc(universityId)
      .collection('schools')
      .doc(schoolId)

    const schoolData = (await schoolSnapshot.get()).data()

    const degreesData = await schoolSnapshot
      .collection('degrees')
      .orderBy('name')
      .get()

    if (degreesData.empty) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    const degrees = degreesData.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id
      }
    })
    res
      .status(200)
      .json({ ...schoolData, id: schoolSnapshot.id, degrees })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}
