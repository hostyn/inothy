import admin from 'firebase-admin'

try {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
    )
  })
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack)
  }
}

export const authAdmin = admin.auth()
export const firestoreAdmin = admin.firestore()
export const storageAdmin = admin
  .storage()
  .bucket(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE).storageBucket)

export default admin
