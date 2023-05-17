const admin = require('firebase-admin')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config({ path: '.env.development.local' })
dotenv.config({ path: '.env.development' })

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
  const storageAdmin = admin
    .storage()
    .bucket(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE).storageBucket)

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

  // Delete all universities
  console.log('[#] Deleting all universities')
  firestoreAdmin.recursiveDelete(firestoreAdmin.collection('universities'))

  // Delete all subjects
  console.log('[#] Deleting all subjects')
  firestoreAdmin.recursiveDelete(firestoreAdmin.collection('subjects'))

  // Delete all files
  console.log('[#] Deleting all files')
  await storageAdmin.deleteFiles({ prefix: 'files' })

  // Delete all previews
  console.log('[#] Deleting all previews')
  await storageAdmin.deleteFiles({ prefix: 'previews' })

  // Delete all university_logos
  console.log('[#] Deleting all university logos')
  await storageAdmin.deleteFiles({ prefix: 'university_logos' })

  // Write new database
  console.log('[#] Writing new database')
  const universities = JSON.parse(
    fs.readFileSync('scripts/resources/universities.json')
  )
  const subjects = JSON.parse(
    fs.readFileSync('scripts/resources/subjects.json')
  )

  console.log('[#] Writing universities')
  const bulk = firestoreAdmin.bulkWriter()
  universities.forEach(univeristy => {
    const logoBuffer = fs.readFileSync(
      `scripts/resources/${univeristy.symbol}.png`
    )

    const universityLogoRef = storageAdmin.file(
      `univeristy_logo/${univeristy.uid}.png`
    )

    const logoUrl = universityLogoRef.publicUrl()

    universityLogoRef.save(logoBuffer, { contentType: 'image/png' })

    const { uid: univeristyUid, schools, ...universityData } = univeristy

    const universityRef = firestoreAdmin
      .collection('universities')
      .doc(univeristyUid)

    bulk.create(universityRef, {
      ...universityData,
      logoUrl,
    })

    schools.forEach(school => {
      const { uid: schoolUid, degrees, ...schoolData } = school
      const schoolRef = universityRef.collection('schools').doc(schoolUid)
      bulk.create(schoolRef, schoolData)

      degrees.forEach(degree => {
        const { uid: degreeUid, ...degreeData } = degree
        const degreeRef = schoolRef.collection('degrees').doc(degreeUid)
        bulk.create(degreeRef, degreeData)
      })
    })
  })

  console.log('[#] Writing subjects')
  subjects.forEach(subject => {
    const { uid, ...subjectData } = subject
    bulk.create(firestoreAdmin.collection('subjects').doc(uid), subjectData)
  })

  await bulk.flush()

  // Creating users
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
