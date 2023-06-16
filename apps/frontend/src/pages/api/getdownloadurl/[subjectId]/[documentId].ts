import { firestoreAdmin, storageAdmin } from '@config/firebaseadmin'
import withAuthFullData from '@middleware/withAuthFullData'
import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'

async function getDownloadUrl(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { subjectId, documentId } = req.query

  if (typeof subjectId !== 'string') {
    res.status(400).json({ success: false, error: 'subject-id-required' })
    return
  }

  if (typeof documentId !== 'string') {
    res.status(400).json({ success: false, error: 'document-id-required' })
    return
  }

  const documentSnapshot = await firestoreAdmin
    .collection('subjects')
    .doc(subjectId)
    .collection('docs')
    .doc(documentId)
    .get()

  if (!documentSnapshot.exists) {
    res.status(404).json({ success: false, error: 'not-found' })
    return
  }

  const documentData = documentSnapshot.data()

  if (
    (typeof user.data.bought === 'object'
      ? !user.data.bought.includes(subjectId + '/' + documentId)
      : true) &&
    documentData?.createdBy !== user.uid
  ) {
    res.status(404).json({ success: false, error: 'not-found' })
    return
  }

  const [url] = await storageAdmin.file(documentData?.file).getSignedUrl({
    action: 'read',
    expires: new Date().getTime() + 5 * 60 * 1000,
  })

  res.status(200).json({ success: true, url })
}

export default withMethod('GET', withAuthFullData(getDownloadUrl))
