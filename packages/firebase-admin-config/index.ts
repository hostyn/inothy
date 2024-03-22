import { type Bucket } from '@google-cloud/storage'
import admin from 'firebase-admin'

try {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS as string)
    ),
  })
} catch (error) {
  console.error('Firebase admin initialization error', error)
}

export const authAdmin = admin.auth()
export const firestoreAdmin = admin.firestore()
export const storageAdmin: Bucket = admin
  .storage()
  .bucket(process.env.FIREBASE_BUCKET as string)

export default admin
