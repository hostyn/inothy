import admin from 'firebase-admin'
import { serverEnv } from 'env'

try {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(serverEnv.FIREBASE_ADMIN_CREDENTIALS)
    ),
  })
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack)
  }
}

export const authAdmin = admin.auth()
export const firestoreAdmin = admin.firestore()
export const storageAdmin = admin
  .storage()
  .bucket(JSON.parse(serverEnv.NEXT_PUBLIC_FIREBASE).storageBucket)

export default admin
