import { type Bucket } from '@google-cloud/storage'
import admin from 'firebase-admin'

const adminProd = admin.initializeApp(
  {
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_PRODUCTION as string)
    ),
  },
  'production'
)

export const authAdminProd = adminProd.auth()
export const firestoreAdminProd = adminProd.firestore()
export const storageAdminProd: Bucket = adminProd
  .storage()
  .bucket(process.env.FIREBASE_PRODUCTION_BUCKET as string)

export const storageAdminNewProd: Bucket = adminProd
  .storage()
  .bucket(process.env.FIREBASE_PRODUCTION_BUCKET_NEW as string)

export default adminProd
