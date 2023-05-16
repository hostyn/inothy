import mangopay from '@config/mangopay'
import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiUser, CreateCardRegistration } from 'types/api'
import withProfileCompleted from '@middleware/withProfileCompleted'

async function createCardRegistration(
  user: ApiUser,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (typeof user.data.mangopayClientId !== 'string') {
    res.status(400).json({ success: false, error: 'unexpected-exception' })
    return
  }

  try {
    const response = await mangopay.CardRegistrations.create({
      UserId: user.data.mangopayClientId,
      Currency: 'EUR',
      CardType: 'CB_VISA_MASTERCARD',
    })

    const createCardRegistration: CreateCardRegistration = {
      Id: response.Id,
      PreregistrationData: response.PreregistrationData,
      AccessKey: response.AccessKey,
      CardRegistrationUrl: response.CardRegistrationURL,
    }

    res.status(200).json(createCardRegistration)
    return
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default withMethod('POST', withProfileCompleted(createCardRegistration))
