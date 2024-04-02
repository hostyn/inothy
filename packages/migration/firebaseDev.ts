import { type Bucket } from '@google-cloud/storage'
import admin from 'firebase-admin'

const adminDev = admin.initializeApp(
  {
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_DEVELOPMENT as string)
    ),
  },
  'development'
)

export const authAdminDev = adminDev.auth()
export const firestoreAdminDev = adminDev.firestore()
export const storageAdminDev: Bucket = adminDev
  .storage()
  .bucket(process.env.FIREBASE_DEVELOPMENT_BUCKET as string)

export default adminDev
