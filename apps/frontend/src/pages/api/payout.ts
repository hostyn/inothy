import withMethod from '@middleware/withMethod'
import withProfileCompleted from '@middleware/withProfileCompleted'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'
import mangopay from '../../config/mangopay'

async function payout(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (user.data.mangopayKYCLevel !== 'REGULAR') {
    res.status(400).json({ success: false, error: 'kyc-needed' })
    return
  }

  if (typeof user.data.mangopayWalletId !== 'string') {
    res.status(400).json({ success: false, error: 'unexpected-exception' })
    return
  }

  if (typeof user.data.mangopayClientId !== 'string') {
    res.status(400).json({ success: false, error: 'unexpected-exception' })
    return
  }

  const wallet = await mangopay.Wallets.get(user.data.mangopayWalletId)
  const balance = wallet.Balance.Amount

  if (balance === 0) {
    res.status(400).json({ success: false, error: 'not-enough-balance' })
    return
  }

  const [bankAccount] = await mangopay.Users.getBankAccounts(
    user.data.mangopayClientId,
    {
      parameters: {
        Active: true,
      },
    }
  )

  await mangopay.PayOuts.create({
    AuthorId: user.data.mangopayClientId,
    DebitedFunds: { Currency: 'EUR', Amount: balance },
    Fees: { Currency: 'EUR', Amount: 0 },
    BankAccountId: bankAccount.Id,
    DebitedWalletId: user.data.mangopayWalletId,
    PaymentType: 'BANK_WIRE',
  })

  res.status(200).json({ success: true })
}

export default withMethod('POST', withProfileCompleted(payout))
