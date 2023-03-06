import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestoreAdmin } from '@config/firebaseadmin'

async function getSubject(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { subjectId, limit: initialLimit, startAfter } = req.query

  if (typeof subjectId !== 'string') {
    res.status(400).json({ success: false, error: 'subject-id-required' })
    return
  }

  if (typeof initialLimit === 'object') {
    res.status(400).json({ success: false, error: 'invalid-limit' })
    return
  }

  if (typeof startAfter === 'object') {
    res.status(400).json({ success: false, error: 'invalid-start-after' })
    return
  }

  const limit = typeof initialLimit === 'string' ? parseInt(initialLimit) : 5

  const subjectReference = firestoreAdmin.collection('subjects').doc(subjectId)

  const subjectSnapshot = await subjectReference.get()

  if (!subjectSnapshot.exists) {
    res.status(404).json({ success: false, error: 'subject-not-found' })
  }

  const subjectData = subjectSnapshot.data()

  const universityData = (
    await firestoreAdmin
      .collection('universities')
      .doc(subjectData?.university)
      .get()
  ).data()

  const docsSnapshot =
    startAfter != null && startAfter.length > 0
      ? await subjectReference
          .collection('docs')
          .startAfter(
            await subjectReference.collection('docs').doc(startAfter).get()
          )
          .limit(limit)
          .get()
      : await subjectReference.collection('docs').limit(limit).get()

  if (docsSnapshot.empty) {
    res.status(200).json({
      ...subjectData,
      id: subjectId,
      university: universityData,
      docs: [],
    })
    return
  }

  const docsData = docsSnapshot.docs.map(doc => {
    const docData = doc.data()
    return {
      ...docData,
      verificationStatus: undefined,
      verified: docData.verificationStatus === 'verified',
      id: doc.id,
    }
  })

  res.status(200).json({
    ...subjectData,
    id: subjectId,
    university: universityData,
    docs: docsData,
    last: docsSnapshot.docs.length !== limit ? null : docsData.at(-1)?.id,
  })
}

export default withMethod('GET', getSubject)
