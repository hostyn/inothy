import withAuthFullData from '@middleware/withAuthFullData'
import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'
import mangopay from '@config/mangopay'

async function getBankAccount(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (typeof user.data.mangopayClientId !== 'string') {
    res.status(400).json({ success: false, error: 'unexpected-exception' })
    return
  }

  const response = await mangopay.Users.getBankAccounts(
    user.data.mangopayClientId,
    {
      parameters: {
        Active: true,
      },
    }
  )

  if (response.length === 0) {
    res.status(404).end()
    return
  }

  res.status(200).json(response[0])
}

export default withMethod('GET', withAuthFullData(getBankAccount))
