import withAuthFullData from '@middleware/withAuthFullData'
import withMethod from '@middleware/withMethod'
import type { card } from 'mangopay2-nodejs-sdk'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser } from 'types/api'
import mangopay from '../../config/mangopay'

interface CardInfo extends card.CardData {
  UserId: string
}

async function deleteCard(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { cardId } = JSON.parse(req.body)

  if (typeof cardId !== 'string') {
    res.status(400).json({ success: false, error: 'card-id-required' })
    return
  }

  const cardData = (await mangopay.Cards.get(cardId)) as CardInfo

  if (user.data.mangopayClientId !== cardData.UserId) {
    res.status(401).json({ success: false, error: 'unauthorized' })
    return
  }

  await mangopay.Cards.update({ Id: cardId, Active: false })

  res.status(200).json({ success: true })
}

export default withMethod('POST', withAuthFullData(deleteCard))
