import { firestoreAdmin } from '@config/firebaseadmin'
import withMethod from '@middleware/withMethod'
import withProfileCompleted from '@middleware/withProfileCompleted'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'
import type { FirestoreUser } from 'types/firestore'
import mangopay from '../../config/mangopay'
import getAge from '../../util/getAge'

async function kyc(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (user.data.mangopayKYCStatus === 'VALIDATED') {
    res.status(400).json({ success: false, error: 'kyc-already-verified' })
    return
  }

  if (typeof user.data.mangopayClientId !== 'string') {
    res.status(400).json({ success: false, error: 'unexpected-error' })
    return
  }

  const body = JSON.parse(req.body)

  if (
    typeof body.name !== 'string' ||
    typeof body.surname !== 'string' ||
    typeof body.email !== 'string' ||
    typeof body.address1 !== 'string' ||
    typeof body.address2 !== 'string' ||
    typeof body.city !== 'string' ||
    typeof body.region !== 'string' ||
    typeof body.postalCode !== 'string' ||
    typeof body.birthday !== 'number' ||
    typeof body.nationality !== 'string' ||
    typeof body.files !== 'object' ||
    body.files.length === 0
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

  if (getAge(new Date(body.birthday)) < 18) {
    res.status(400).json({ success: false, error: 'undeage' })
    return
  }

  await mangopay.Users.update({
    Id: user.data.mangopayClientId,
    PersonType: 'NATURAL',
    FirstName: body.name,
    LastName: body.surname,
    Address: {
      AddressLine1: body.address1,
      AddressLine2: body.address2,
      City: body.city,
      Region: body.region,
      PostalCode: body.postalCode,
      Country: 'ES',
    },
    Birthday: body.birthday,
    Nationality: body.nationality,
    CountryOfResidence: 'ES',
    UserCategory: 'OWNER',
  })

  const createKycResponse = await mangopay.Users.createKycDocument(
    user.data.mangopayClientId,
    {
      Type: 'IDENTITY_PROOF',
    }
  )

  await Promise.all(
    body.files.map(
      async (file: string) =>
        await mangopay.Users.createKycPage(
          user.data.mangopayClientId ?? '',
          createKycResponse.Id,
          {
            File: file.split(',')[1],
          }
        )
    )
  )

  await mangopay.Users.updateKycDocument(user.data.mangopayClientId, {
    Id: createKycResponse.Id,
    Status: 'VALIDATION_ASKED',
  })

  const newUserData: Omit<
    FirestoreUser,
    'createdAt' | 'email' | 'profileCompleted' | 'uid'
  > = {
    name: body.name,
    surname: body.surname,
    address: {
      address1: body.address1,
      address2: body.address2,
      city: body.city,
      region: body.region,
      postalCode: body.postalCode,
      country: 'ES',
    },
    birthday: body.birthday,
    nationality: body.nationality,
    countryOfResidence: 'ES',
    mangopayType: 'OWNER',
    mangopayKYCLevel: 'LIGHT',
    mangopayKYCId: createKycResponse.Id,
    mangopayKYCStatus: 'VALIDATION_ASKED',
    mangopayKYCRefusedReasonType: null,
    mangopayKYCRefusedReasonMessage: null,
  }

  await firestoreAdmin.collection('users').doc(user.uid).update(newUserData)

  res.status(200).json({ success: true })
}

export const config = {
  api: {
    bodyParser: { sizeLimit: '21mb' },
  },
}

export default withMethod('POST', withProfileCompleted(kyc))
