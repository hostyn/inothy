import { type Bucket } from '@google-cloud/storage'
import { serverEnv } from 'env'
import admin from 'firebase-admin'

try {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(serverEnv.FIREBASE_ADMIN_CREDENTIALS)
    ),
  })
} catch (error) {
  console.error('Firebase admin initialization error', error)
}

export const authAdmin = admin.auth()
export const firestoreAdmin = admin.firestore()
export const storageAdmin: Bucket = admin
  .storage()
  .bucket(JSON.parse(serverEnv.NEXT_PUBLIC_FIREBASE).storageBucket)

export default admin
