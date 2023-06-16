import mangopay from '@config/mangopay'
import withMethod from '@middleware/withMethod'
import withProfileCompleted from '@middleware/withProfileCompleted'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'

async function updatebank(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const body = JSON.parse(req.body)

  if (typeof user.data.mangopayClientId !== 'string') {
    res.status(400).json({ success: false, error: 'unexpected-exception' })
    return
  }

  try {
    const bankAccount = await mangopay.Users.createBankAccount(
      user.data.mangopayClientId,
      {
        Type: 'IBAN',
        OwnerName: `${user.data.name ?? ''} ${user.data.surname ?? ''}`,
        OwnerAddress: {
          AddressLine1: user.data.address?.address1 ?? '',
          AddressLine2: user.data.address?.address2 ?? '',
          City: user.data.address?.city ?? '',
          Country: user.data.address?.country ?? 'ES',
          PostalCode: user.data.address?.postalCode ?? '',
          Region: user.data.address?.region ?? '',
        },
        IBAN: body.iban,
      }
    )

    const bankAccounts = await mangopay.Users.getBankAccounts(
      user.data.mangopayClientId,
      {
        parameters: {
          Active: true,
        },
      }
    )

    await Promise.all(
      bankAccounts
        .filter(bank => bank.Id !== bankAccount.Id)
        .map(
          async bank =>
            await mangopay.Users.deactivateBankAccount(
              user.data.mangopayClientId ,
              bank.Id
            )
        )
    )

    res.status(200).json(bankAccount)
    
  } catch {
    res.status(400).json({ success: false, error: 'invalid-iban' })
  }
}

export default withMethod('POST', withProfileCompleted(updatebank))
