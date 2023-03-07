/* eslint-disable @typescript-eslint/restrict-plus-operands */
import withAuthFullData from '@middleware/withAuthFullData'
import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'
import { firestoreAdmin, storageAdmin } from '@config/firebaseadmin'
import { MIN_PRICE } from '@config/constants'
import makePreview from '@util/makePreview'
import type {
  FirestoreDocument,
  FirestoreSubject,
  FirestoreUser,
} from 'types/firestore'

async function upload(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const body = JSON.parse(req.body)

  if (typeof body.name !== 'string') {
    res.status(400).json({ success: false, error: 'name-required' })
    return
  }

  if (typeof body.description !== 'string') {
    res.status(400).json({ success: false, error: 'description-required' })
    return
  }

  if (typeof body.subject !== 'string') {
    res.status(400).json({ success: false, error: 'subject-required' })
    return
  }

  if (typeof body.filePath !== 'string') {
    res.status(400).json({ success: false, error: 'file-path-required' })
    return
  }

  if (typeof body.requestVerification !== 'boolean') {
    res
      .status(400)
      .json({ success: false, error: 'request-verification-required' })
    return
  }

  if (typeof body.price !== 'number') {
    res.status(400).json({ success: false, error: 'price-required' })
    return
  }

  // TODO: Env variable for length
  if (body.name.length < 10) {
    res.status(400).json({ success: false, error: 'name-too-short' })
    return
  }

  const subjectReference = firestoreAdmin
    .collection('subjects')
    .doc(body.subject)
  const subjectSnapshot = await subjectReference.get()

  if (!subjectSnapshot.exists) {
    res.status(400).json({ success: false, error: 'invalid-subject' })
    return
  }

  const subjectData = subjectSnapshot.data() as FirestoreSubject

  if (body.price < MIN_PRICE || body.price > subjectData.maxPrice) {
    res.status(400).json({ success: false, error: 'invalid-price' })
    return
  }

  const file = storageAdmin.file(body.filePath)
  const fileMetadata = await file.getMetadata()

  if (
    !(fileMetadata[0].metadata.user === user.uid) ||
    fileMetadata[0].metadata.uploadCompleted !== 'false'
  ) {
    res.status(400).json('invalid-file')
    return
  }

  await file.setMetadata({
    metadata: {
      uploadCompleted: true,
    },
  })

  const docs = subjectReference.collection('docs')

  const documentData: FirestoreDocument = {
    name: body.name,
    description: body.description,
    file: body.filePath,
    fileName: body.filePath.split('/').at(-1),
    createdAt: new Date().getTime(),
    createdBy: user.uid,
    price: body.price,
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    verificationStatus: body.requestVerification ? 'asked' : 'not_asked',
    rating: null,
    totalRatings: 0,
    contentType: fileMetadata[0].contentType,
    preview: false,
    sales: 0,
  }

  const documentReference = await docs.add(documentData)

  const userReference = firestoreAdmin.collection('users').doc(user.uid)

  await firestoreAdmin.runTransaction(async transaction => {
    const userData = (
      await transaction.get(userReference)
    ).data() as FirestoreUser
    transaction.update(userReference, {
      uploaded:
        userData.uploaded != null && userData.uploaded.length !== 0
          ? [...userData.uploaded, body.subject + '/' + documentReference.id]
          : [body.subject + '/' + documentReference.id],
      hasUploaded: true,
    })
  })

  res.status(201).json({ status: 'success', path: documentReference.path })

  if (fileMetadata[0].contentType === 'application/pdf') {
    const url = await file.getSignedUrl({
      action: 'read',
      expires: new Date().getTime() + 5 * 60 * 1000,
    })

    const previewBuffer = await makePreview(url.toString())

    const previewRef = storageAdmin.file(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `previews/${body.subject}/${documentReference.id}.pdf`
    )

    const previewStream = previewRef.createWriteStream({ resumable: false })
    previewStream.end(previewBuffer)

    await documentReference.update({
      preview: true,
    })
  }
}

export default withMethod('POST', withAuthFullData(upload))
