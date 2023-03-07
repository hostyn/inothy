import mangopay from '@config/mangopay'
import withMethod from '@middleware/withMethod'
import withProfileCompleted from '@middleware/withProfileCompleted'
import type { ApiUser } from 'types/api'
import type { NextApiRequest, NextApiResponse } from 'next'

async function getCards(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (typeof user.data.mangopayClientId !== 'string') {
    res.status(400).json({ success: false, error: 'unexpected-exception' })
    return
  }

  try {
    const cards = await mangopay.Users.getCards(user.data.mangopayClientId, {
      parameters: {
        Per_Page: 50,
        Active: true,
      },
    })

    res.status(200).json(cards)
    return
  } catch {
    res.status(500).json({ error: 'unexepected-exception' })
  }
}

export default withMethod('GET', withProfileCompleted(getCards))
