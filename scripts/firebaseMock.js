const dotenv = require('dotenv')
dotenv.config({ path: '.env.development.local' })
const admin = require('firebase-admin')

async function main() {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
      ),
    })
  } catch (error) {
    if (!/already exists/u.test(error.message)) {
      console.error('Firebase admin initialization error', error.stack)
    }
  }

  const authAdmin = admin.auth()
  const firestoreAdmin = admin.firestore()

  // Delete all users
  console.log('[#] Deleting all users')
  const users = await authAdmin.listUsers()
  const usersUIDs = users.users.map(user => user.uid)
  authAdmin.deleteUsers(usersUIDs)

  // Delete all user documents
  console.log('[#] Deleting all documents')
  firestoreAdmin.recursiveDelete(firestoreAdmin.collection('users'))

  // Delete all referrals
  console.log('[#] Deleting all referrals')
  firestoreAdmin.recursiveDelete(firestoreAdmin.collection('referrals'))

  // Delete all transactions
  console.log('[#] Deleting all transactions')
  firestoreAdmin.recursiveDelete(firestoreAdmin.collection('transactions'))

  // Delete all documents
  console.log('[#] Deleting all documents')
  const documents = await firestoreAdmin.collectionGroup('docs').get()
  const bulk = firestoreAdmin.bulkWriter()
  documents.docs.map(doc => bulk.delete(doc.ref))
  bulk.close()

  console.log('[#] Creating user')
  const email = 'hostyn96@gmail.com'
  const password = 'prueba123'
  const user = await authAdmin.createUser({
    email,
    password,
    emailVerified: true,
  })
  console.log(`[#] User ${email} - ${password} created`)
}

main()
