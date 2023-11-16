import admin from 'firebase-admin'

try {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS as string)
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
  .bucket(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE as string).storageBucket)

export default admin
