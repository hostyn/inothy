import { firestoreAdmin } from '../../../config/firebaseadmin'

export default async function subject (req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  try {
    const { subjectId, limit: initialLimit, startAfter } = req.query
    const subjectSnapshot = firestoreAdmin
      .collection('subjects')
      .doc(subjectId)

    const limit = parseInt(initialLimit) || 5

    let subjectData = await subjectSnapshot.get()

    if (!subjectData.exists) throw new Error('Not found')

    subjectData = subjectData.data()

    const university = (
      await firestoreAdmin
        .collection('universities')
        .doc(subjectData.university)
        .get()
    ).data()

    const docs = startAfter
      ? await subjectSnapshot
        .collection('docs')
        .startAfter(
          await subjectSnapshot.collection('docs').doc(startAfter).get()
        )
        .limit(limit)
        .get()
      : await subjectSnapshot.collection('docs').limit(limit).get()

    if (docs.empty) {
      res.status(200).json({
        ...subjectData,
        id: subjectId,
        university,
        docs: []
      })
      return
    }

    const docsData = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    res.status(200).json({
      ...subjectData,
      id: subjectId,
      university,
      docs: docsData,
      last: docs.docs.length === limit ? docs.docs.at(-1).id : false
    })
    return
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Internal server error' })
  }
}
