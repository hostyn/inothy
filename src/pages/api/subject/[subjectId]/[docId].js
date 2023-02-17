import { firestoreAdmin } from '../../../../config/firebaseadmin'

export default async function Document (req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  try {
    const { subjectId, docId } = req.query

    const subjectSnapshot = firestoreAdmin
      .collection('subjects')
      .doc(subjectId)

    const docSnapshot = subjectSnapshot.collection('docs').doc(docId)

    let subjectData = subjectSnapshot.get()
    let docData = await docSnapshot.get()

    if (!docData.exists) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    subjectData = (await subjectData).data()
    docData = docData.data()

    let universityData = firestoreAdmin
      .collection('universities')
      .doc(subjectData.university)
      .get()

    const creatorData = (
      await firestoreAdmin.collection('users').doc(docData.createdBy).get()
    ).data()

    universityData = (await universityData).data()

    res.status(200).json({
      subjectId,
      subject: subjectData,
      university: universityData,
      docId,
      createdAt: docData.createdAt,
      createdBy: creatorData.username,
      createdById: docData.createdBy,
      description: docData.description,
      file: docData.file,
      fileName: docData.fileName,
      name: docData.name,
      price: docData.price,
      rating: docData.rating,
      totalRatings: docData.totalRatings,
      contentType: docData.contentType,
      preview: docData.preview
    })
    return
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Internal server error' })
  }
}
