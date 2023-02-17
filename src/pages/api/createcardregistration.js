import mangopay from '../../config/mangopay'
import { authAdmin, firestoreAdmin } from '../../config/firebaseadmin'

export default async function createcardregistration (req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = req.headers.authorization.split(' ')[1]
  const user = await authAdmin.verifyIdToken(token).catch((error) => {
    console.log(error)
    res.status(401).json({ error: 'Unauthorized' })
  })

  const userData = (
    await firestoreAdmin.collection('users').doc(user.uid).get()
  ).data()

  try {
    const response = await mangopay.CardRegistrations.create({
      UserId: userData.mangopayClientId,
      Currency: 'EUR',
      CardType: 'CB_VISA_MASTERCARD'
    })

    res.status(200).json({
      Id: response.Id,
      PreregistrationData: response.PreregistrationData,
      AccessKey: response.AccessKey,
      CardRegistrationUrl: response.CardRegistrationURL
    })
    return
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Internal server error' })
  }
}
