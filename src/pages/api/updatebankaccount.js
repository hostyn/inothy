import { authAdmin, firestoreAdmin } from '../../config/firebaseadmin'
import mangopay from '../../config/mangopay'

export default async function updatebank (req, res) {
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
    res.status(401).json({ error: 'Unauthorized' })
  })

  const userData = (
    await firestoreAdmin.collection('users').doc(user.uid).get()
  ).data()

  const body = JSON.parse(req.body)

  try {
    const bankAccount = await mangopay.Users.createBankAccount(
      userData.mangopayClientId,
      {
        Type: 'IBAN',
        OwnerName: userData.name + ' ' + userData.surname,
        OwnerAddress: {
          AddressLine1: userData.address.address1,
          AddressLine2: userData.address.address2,
          City: userData.address.city,
          Country: userData.address.country,
          PostalCode: userData.address.postalCode,
          Region: userData.address.region
        },
        IBAN: body.iban
      }
    )

    const bankAccounts = await mangopay.Users.getBankAccounts(
      userData.mangopayClientId,
      {
        parameters: {
          Active: true
        }
      }
    )

    await Promise.all(
      bankAccounts
        .filter((bank) => bank.Id !== bankAccount.Id)
        .map((bank) => (
          mangopay.Users.deactivateBankAccount(
            userData.mangopayClientId,
            bank.Id
          )
        ))
    )

    res.status(200).json(bankAccount)
    return
  } catch {
    res.status(400).json({ error: 'Invalid iban' })
  }
}
