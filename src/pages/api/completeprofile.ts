import withAuthFullData from '@middleware/withAuthFullData'
import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'
import { firestoreAdmin } from '../../config/firebaseadmin'
import mangopay from '../../config/mangopay'

async function completeprofile(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (!user.emailVerified) {
    res.status(400).json({ success: false, error: 'email-not-verified' })
    return
  }

  if (user.data.profileCompleted ?? false) {
    res.status(400).json({ success: false, error: 'profile-already-completed' })
    return
  }

  // Ip address
  const forwardedFor = req.headers['x-forwarded-for'] as string | undefined
  const ipAddress = forwardedFor?.split(',')[0] ?? null

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
    ? userReferralSnapshot.data()?.ref
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

  const ambassador =
    new Date(user.data.createdAt ?? '') < new Date('2022-09-01GMT+2')

  try {
    await firestoreAdmin
      .collection('users')
      .doc(user.uid)
      .update({
        profileCompleted: true,
        name: body.name,
        surname: body.surname,
        username: body.username,
        biography: body.biography,
        address: {
          address1: body.address1,
          address2: body.address2,
          city: body.city,
          region: body.region,
          postalCode: body.postalCode,
          country: 'ES',
        },
        mangopayClientId,
        mangopayWalletId,
        mangopayKYCStatus: null,
        university: body.university,
        school: body.school,
        degree: body.degree,
        ref,
        ipAddress,
        badge: ambassador ? ['ambassador'] : [],
      })
    res.status(200).json({ success: true })
    return
  } catch {
    res.status(500).json({ success: false, error: 'unexpected-exception' })
  }
}

export default withMethod('POST', withAuthFullData(completeprofile))
