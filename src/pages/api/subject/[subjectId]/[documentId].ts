import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestoreAdmin } from '@config/firebaseadmin'
import type { FullDocumentInfo } from 'types/api'
import type {
  FirestoreDocument,
  FirestoreSubject,
  FirestoreUniversity,
  FirestoreUser,
} from 'types/firestore'

async function getDocument(
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

  const subjectReference = firestoreAdmin.collection('subjects').doc(subjectId)

  const documentReference = subjectReference.collection('docs').doc(documentId)

  const subjectSnapshot = await subjectReference.get()
  const documentSnapshot = await documentReference.get()

  if (!documentSnapshot.exists) {
    res.status(404).json({ success: false, error: 'not-found' })
    return
  }

  const subjectData = subjectSnapshot.data() as FirestoreSubject
  const documentData = documentSnapshot.data() as FirestoreDocument

  const universitySnapshot = await firestoreAdmin
    .collection('universities')
    .doc(subjectData?.university)
    .get()

  const creatorSnapshot = await firestoreAdmin
    .collection('users')
    .doc(documentData?.createdBy)
    .get()

  const creatorData = creatorSnapshot.data() as FirestoreUser

  const universityData = universitySnapshot.data() as FirestoreUniversity

  const document: FullDocumentInfo = {
    subject: { ...subjectData, id: subjectId },
    university: { ...universityData, id: universitySnapshot.id },
    id: documentId,
    createdAt: documentData.createdAt,
    createdBy: creatorData.username ?? '',
    createdById: documentData.createdBy,
    description: documentData.description,
    file: documentData.file,
    fileName: documentData.fileName,
    name: documentData.name,
    price: documentData.price,
    rating: documentData.rating,
    totalRatings: documentData.totalRatings,
    contentType: documentData.contentType,
    preview: documentData.preview,
    sales: documentData.sales,
    verified: documentData.verificationStatus === 'verificated',
  }

  res.status(200).json(document)
}

export default withMethod('GET', getDocument)
