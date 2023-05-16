import admin from 'firebase-admin'
import { FIREBASE_ADMIN_CREDENTIALS, FIREBASE_PUBLIC } from '@config/constants'

try {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(FIREBASE_ADMIN_CREDENTIALS)),
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
  .bucket(JSON.parse(FIREBASE_PUBLIC).storageBucket)

export default admin
