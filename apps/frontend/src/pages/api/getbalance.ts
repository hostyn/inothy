import withMethod from '@middleware/withMethod'
import withProfileCompleted from '@middleware/withProfileCompleted'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'
import mangopay from '@config/mangopay'

async function getBalance(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (typeof user.data.mangopayWalletId !== 'string') {
    res.status(400).json({ success: false, error: 'unexpected-exception' })
    return
  }

  try {
    const response = await mangopay.Wallets.get(user.data.mangopayWalletId)
    res.status(200).json({ success: true, balance: response.Balance.Amount / 100 })
  } catch {
    res.status(500).json({ success: false, error: 'unexpected-error' })
  }
}

export default withMethod('GET', withProfileCompleted(getBalance))
