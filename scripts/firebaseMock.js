const admin = require('firebase-admin')
const fs = require('fs')
const dotenv = require('dotenv')
const MangoPay = require('mangopay2-nodejs-sdk')
dotenv.config({ path: '.env.development.local' })
dotenv.config({ path: '.env.development' })

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

const mangopay = new MangoPay({
  clientId: process.env.MANGOPAY_CLIENT_ID,
  clientApiKey: process.env.MANGOPAY_API_KEY,
  baseUrl: process.env.MANGOPAY_ENDPOINT,
})

async function main() {
  // Delete all users
  console.log('[#] Deleting all users')
  const users = await authAdmin.listUsers()
  const usersUIDs = users.users.map(user => user.uid)
  authAdmin.deleteUsers(usersUIDs)

  // Delete all user documents
  console.log('[#] Deleting all documents')
  await firestoreAdmin.recursiveDelete(firestoreAdmin.collection('users'))

  // // Delete all referrals
  // console.log('[#] Deleting all referrals')
  // await firestoreAdmin.recursiveDelete(firestoreAdmin.collection('referrals'))

  // // Delete all transactions
  // console.log('[#] Deleting all transactions')
  // await firestoreAdmin.recursiveDelete(
  //   firestoreAdmin.collection('transactions')
  // )

  // // Delete all universities
  // console.log('[#] Deleting all universities')
  // await firestoreAdmin.recursiveDelete(
  //   firestoreAdmin.collection('universities')
  // )

  // // Delete all subjects
  // console.log('[#] Deleting all subjects')
  // await firestoreAdmin.recursiveDelete(firestoreAdmin.collection('subjects'))

  // // Delete all files
  // console.log('[#] Deleting all files')
  // await storageAdmin.deleteFiles({ prefix: 'files' })

  // // Delete all previews
  // console.log('[#] Deleting all previews')
  // await storageAdmin.deleteFiles({ prefix: 'previews' })

  // // Delete all university_logos
  // console.log('[#] Deleting all university logos')
  // await storageAdmin.deleteFiles({ prefix: 'university_logos' })

  // // Write new database
  // console.log('[#] Creating new database')
  // const universities = JSON.parse(
  //   fs.readFileSync('scripts/resources/universities.json')
  // )
  // const subjects = JSON.parse(
  //   fs.readFileSync('scripts/resources/subjects.json')
  // )

  // console.log('[#] Creating universities')
  // const bulk = firestoreAdmin.bulkWriter()
  // universities.forEach(univeristy => {
  //   const logoBuffer = fs.readFileSync(
  //     `scripts/resources/${univeristy.symbol}.png`
  //   )

  //   const universityLogoRef = storageAdmin.file(
  //     `univeristy_logo/${univeristy.uid}.png`
  //   )

  //   const logoUrl = universityLogoRef.publicUrl()

  //   universityLogoRef
  //     .save(logoBuffer)
  //     .then(() => universityLogoRef.makePublic())

  //   const { uid: univeristyUid, schools, ...universityData } = univeristy

  //   const universityRef = firestoreAdmin
  //     .collection('universities')
  //     .doc(univeristyUid)

  //   bulk.create(universityRef, {
  //     ...universityData,
  //     logoUrl,
  //   })

  //   schools.forEach(school => {
  //     const { uid: schoolUid, degrees, ...schoolData } = school
  //     const schoolRef = universityRef.collection('schools').doc(schoolUid)
  //     bulk.create(schoolRef, schoolData)

  //     degrees.forEach(degree => {
  //       const { uid: degreeUid, ...degreeData } = degree
  //       const degreeRef = schoolRef.collection('degrees').doc(degreeUid)
  //       bulk.create(degreeRef, degreeData)
  //     })
  //   })
  // })

  // console.log('[#] Creating subjects')
  // subjects.forEach(subject => {
  //   const { uid, ...subjectData } = subject
  //   bulk.create(firestoreAdmin.collection('subjects').doc(uid), subjectData)
  // })

  // await bulk.flush()

  // Creating users
  console.log('[#] Creating user')
  const userData = {
    email : 'test@test.com',
    password: 'testtest',
    username: 'usuario1',
    biography: 'Esta es una biografía de prueba',
    name: 'Ruben',
    surname: 'Martinez',
    address1: 'Calle la calle',
    address2: '',
    city: 'Alicante City',
    region: 'Alicante',
    country: 'ES',
    postalCode: '123123',
    birthday: 946684800,
    nationality: 'ES',
    countryOfResidence: 'ES',
  }

  const user = await authAdmin.createUser({
    email: userData.email,
    password: userData.password,
    emailVerified: true,
  })


  // Create mangopay user
  const createUserResponse = await mangopay.Users.create({
    PersonType: 'NATURAL',
    FirstName: userData.name,
    LastName: userData.surname,
    Email: user.email ?? '',
    Address: {
      AddressLine1: userData.address1,
      AddressLine2: userData.address2,
      City: userData.city,
      Region: userData.region,
      PostalCode: userData.postalCode,
      Country: userData.country,
    },
    Birthday: userData.birthday,
    Nationality: userData.nationality,
    CountryOfResidence: userData.countryOfResidence,
    UserCategory: 'OWNER',
    TermsAndConditionsAccepted: true,
  })

  const mangopayClientId = createUserResponse.Id

  const createWalletResponse = await mangopay.Wallets.create({
    Owners: [mangopayClientId],
    Currency: 'EUR',
    Description: 'Inothy Wallet',
  })

  const mangopayWalletId = createWalletResponse.Id

  const unsubscribe = firestoreAdmin
    .collection('users')
    .doc(user.uid)
    .onSnapshot((snapshot) => {
      if (!snapshot.exists) return 
      snapshot.ref.update({
        address: {
          address1: userData.address1,
          address2: userData.address2,
          city: userData.city,
          country: userData.country,
          postalCode: userData.postalCode,
          region: userData.region,
        },
        badge: ['ambassador'],
        biography: userData.biography,
        birthday: null,
        bought: [],
        countryOfResidence: null,
        degree: 'M4fK3BjLRvVNuQzHInxaVSkSFEbd',
        email: userData.email,
        hasUploaded: false,
        ipAddress: '127.0.0.1',
        mangopayClientId,
        mangopayKYCId: null,
        mangopayKYCLevel: 'LIGHT',
        mangopayKYCRefusedReasonMessage: null,
        mangopayKYCRefusedReasonType: null,
        mangopayKYCStatus: null,
        mangopayType: 'OWNER',
        mangopayWalletId, 
        name: userData.name,
        nationality: null,
        profileCompleted: true,
        ref: null,
        sales: 0,
        school: 'Uf7TTkC2djY5CHppwn0LSukRjgv8',
        surname: userData.surname,
        uid: user.uid,
        univeristy: 'k33ySKE8wS28bp33OrCUzZflrXrI',
        uploaded: [],
        username: userData.username,
      })
      console.log(`[#] User ${userData.email} - ${userData.password} created`)
      unsubscribe()
    })
}

main()
