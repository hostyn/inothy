import withAuthFullData from '@middleware/withAuthFullData'
import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'
import { firestoreAdmin } from '@config/firebaseadmin'
import mangopay from '@config/mangopay'
import type { FirestoreReferral, FirestoreUser } from 'types/firestore'

async function completeprofile(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (!user.emailVerified) {
    res.status(400).json({ success: false, error: 'email-not-verified' })
    return
  }

  if (user.data.profileCompleted) {
    res.status(400).json({ success: false, error: 'profile-already-completed' })
    return
  }

  // Ip address
  const forwardedFor = req.headers['x-forwarded-for'] as string | undefined
  const ipAddress = forwardedFor?.split(',')[0] ?? '127.0.0.1'

  const body = JSON.parse(req.body)

  if (
    typeof body.name !== 'string' ||
    typeof body.surname !== 'string' ||
    typeof body.username !== 'string' ||
    typeof body.address1 !== 'string' ||
    typeof body.city !== 'string' ||
    typeof body.region !== 'string' ||
    typeof body.postalCode !== 'string' ||
    typeof body.university !== 'string' ||
    typeof body.school !== 'string' ||
    typeof body.degree !== 'string' ||
    typeof body.biography !== 'string'
  ) {
    res.status(400).json({ success: false, error: 'missing-params' })
    return
  }

  if (
    body.name.match(/^[\w'\-,.]*[^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/) == null
  ) {
    res.status(400).json({ success: false, error: 'invalid-name' })
    return
  }

  if (
    body.surname.match(/^[\w'\-,.]*[^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/) ==
    null
  ) {
    res.status(400).json({ success: false, error: 'invalid-surname' })
    return
  }

  if (body.username.match(/^[a-zA-Z][a-zA-Z\d_\-.]{3,29}$/) == null) {
    res.status(400).json({ success: false, error: 'invalid-username' })
    return
  }

  if (body.biography.length < 20) {
    res.status(400).json({ success: false, error: 'biography-too-short' })
    return
  }

  if (body.biography.length > 500) {
    res.status(400).json({ success: false, error: 'biography-too-long' })
    return
  }

  // Check if username is valid
  if (user.data.username !== body.username) {
    const usernameQuerySnapshot = await firestoreAdmin
      .collection('users')
      .where('username', '==', body.username)
      .get()

    if (!usernameQuerySnapshot.empty) {
      res.status(400).json({ success: false, error: 'username-unavailable' })
      return
    }
  }

  // Check if degree exists
  const degreeSnapshot = await firestoreAdmin
    .collection('universities')
    .doc(body.university)
    .collection('schools')
    .doc(body.school)
    .collection('degrees')
    .doc(body.degree)
    .get()

  if (!degreeSnapshot.exists) {
    res.status(400).json({ success: false, error: 'invalid-degree' })
    return
  }

  // Get referred
  const userReferralSnapshot = await firestoreAdmin
    .collection('referrals')
    .doc(user.uid)
    .get()

  const ref = userReferralSnapshot.exists
    ? (userReferralSnapshot.data() as FirestoreReferral).ref
    : null

  // Create mangopay user
  const createUserResponse = await mangopay.Users.create({
    PersonType: 'NATURAL',
    FirstName: body.name,
    LastName: body.surname,
    Email: user.email ?? '',
    Address: {
      AddressLine1: body.address1,
      AddressLine2: body.address2,
      City: body.city,
      Region: body.region,
      PostalCode: body.postalCode,
      Country: 'ES',
    },
    Birthday: 946684800,
    Nationality: 'ES',
    CountryOfResidence: 'ES',
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

  const ambassador = new Date(user.data.createdAt) < new Date('2022-09-01GMT+1')

  const newUserData: Omit<FirestoreUser, 'createdAt' | 'uid' | 'email'> = {
    address: {
      address1: body.address1,
      address2: typeof body.address2 === 'string' ? body.address2 : null,
      city: body.city,
      country: 'ES',
      postalCode: body.postalCode,
      region: body.region,
    },
    badge: ambassador ? ['ambassador'] : [],
    biography: body.biography,
    birthday: null,
    bought: [],
    countryOfResidence: null,
    degree: body.degree,
    hasUploaded: false,
    ipAddress,
    mangopayClientId,
    mangopayKYCId: null,
    mangopayKYCLevel: createUserResponse.KYCLevel,
    mangopayKYCRefusedReasonMessage: null,
    mangopayKYCRefusedReasonType: null,
    mangopayKYCStatus: null,
    mangopayType: 'OWNER',
    mangopayWalletId,
    name: body.name,
    nationality: null,
    profileCompleted: true,
    ref,
    sales: 0,
    school: body.school,
    surname: body.surname,
    university: body.university,
    uploaded: [],
    username: body.username,
  }

  await firestoreAdmin.collection('users').doc(user.uid).update(newUserData)
  res.status(201).json({ success: true })
}

export default withMethod('POST', withAuthFullData(completeprofile))
