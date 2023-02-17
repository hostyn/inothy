import admin, { firestoreAdmin } from '../../config/firebaseadmin'
import mangopay from '../../config/mangopay'
import getAge from '../../util/getAge'

export default async function kyc (req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = req.headers.authorization.split(' ')[1]
  const user = await admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      res.status(401).json({ error: 'Unauthorized' })
    })

  const userData = (
    await firestoreAdmin.collection('users').doc(user.uid).get()
  ).data()

  if (userData.mangopayKYCStatus === 'VALIDATED') {
    res.status(400).json({ error: 'User already verifyed' })
    return
  }

  const body = JSON.parse(req.body)

  if (
    !body.name ||
    !body.surname ||
    !body.email ||
    !body.address1 ||
    !body.city ||
    !body.region ||
    !body.postalCode ||
    !body.birthday ||
    !body.nationality ||
    !body.files ||
    body.files.length === 0
  ) {
    res.status(400).json({ error: 'Missing params' })
    return
  }

  if (!body.name.match(/^[\w'\-,.]*[^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/)) {
    res.status(400).json({ error: 'Invalid Name' })
    return
  }

  if (
    !body.surname.match(/^[\w'\-,.]*[^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/)
  ) {
    res.status(400).json({ error: 'Invalid Surname' })
    return
  }

  if (getAge(new Date(body.birthday)) < 18) {
    res.status(400).json({ error: 'Must be adult' })
    return
  }

  await mangopay.Users.update({
    Id: userData.mangopayClientId,
    PersonType: 'NATURAL',
    FirstName: body.name,
    LastName: body.surname,
    Address: {
      AddressLine1: body.address1,
      AddressLine2: body.address2,
      City: body.city,
      Region: body.region,
      PostalCode: body.postalCode,
      Country: 'ES'
    },
    Birthday: body.birthday,
    Nationality: body.nationality,
    CountryOfResidence: 'ES',
    UserCategory: 'OWNER'
  })

  const createKycResponse = await mangopay.Users.createKycDocument(
    userData.mangopayClientId,
    {
      Type: 'IDENTITY_PROOF'
    }
  )

  const fileUploads = body.files.map((file) =>
    mangopay.Users.createKycPage(
      userData.mangopayClientId,
      createKycResponse.Id,
      {
        File: file.split(',')[1]
      }
    )
  )

  await Promise.all(fileUploads)

  await mangopay.Users.updateKycDocument(userData.mangopayClientId, {
    Id: createKycResponse.Id,
    Status: 'VALIDATION_ASKED'
  })

  try {
    await admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        name: body.name,
        surname: body.surname,
        address: {
          address1: body.address1,
          address2: body.address2,
          city: body.city,
          region: body.region,
          postalCode: body.postalCode,
          country: 'ES'
        },
        birthday: body.birthday,
        nationality: body.nationality,
        countryOfResidence: 'ES',
        mangopayType: 'OWNER',
        mangopayKYCLevel: 'LIGHT',
        mangopayKYCId: createKycResponse.Id,
        mangopayKYCStatus: 'VALIDATION_ASKED',
        mangopayKYCRefusedReasonType: null,
        mangopayKYCRefusedReasonMessage: null
      })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
    return
  }

  res.status(200).json({ status: 'Success' })
}

export const config = {
  api: {
    bodyParser: { sizeLimit: '21mb' }
  }
}
