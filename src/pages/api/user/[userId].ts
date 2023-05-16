import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { GetUserResponse } from 'types/api'
import type {
  FirestoreDegree,
  FirestoreSchool,
  FirestoreUniversity,
  FirestoreUser,
} from 'types/firestore'
import { firestoreAdmin } from '@config/firebaseadmin'

async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { userId } = req.query

  if (typeof userId !== 'string') {
    res.status(400).json({ success: false, error: 'user-id-required' })
    return
  }

  const userSnapshot = await firestoreAdmin
    .collection('users')
    .doc(userId)
    .get()

  if (!userSnapshot.exists) {
    res.status(404).json({ success: false, error: 'not-found' })
    return
  }

  const userData = userSnapshot.data() as FirestoreUser

  const univseristyReference = firestoreAdmin
    .collection('universities')
    .doc(userData.university as string)

  const universitySnapshot = await univseristyReference.get()
  const universityData = universitySnapshot.data() as FirestoreUniversity

  const schoolReference = univseristyReference
    .collection('schools')
    .doc(userData.school as string)
  const schoolSnapshot = await schoolReference.get()
  const schoolData = schoolSnapshot.data() as FirestoreSchool

  const degreeSnapshot = await schoolReference
    .collection('degrees')
    .doc(userData.degree as string)
    .get()
  const degreeData = degreeSnapshot.data() as FirestoreDegree

  const user: GetUserResponse = {
    username: userData.username as string,
    uploaded: userData.uploaded as string[],
    university: { ...universityData, id: universitySnapshot.id },
    school: { ...schoolData, id: schoolSnapshot.id },
    degree: { ...degreeData, id: degreeSnapshot.id },
    biography: userData.biography as string,
  }

  res.status(200).json(user)
}

export default withMethod('GET', getUser)
