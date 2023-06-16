import withMethod from '@middleware/withMethod'
import type { NextApiRequest, NextApiResponse } from 'next'
import mangopay from '../../config/mangopay'

async function completeCardRegistration(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const body = JSON.parse(req.body)

  if (typeof body.id !== 'string') {
    res.status(400).json({ success: false, error: 'id-required' })
    return
  }

  if (typeof body.registrationData !== 'string') {
    res
      .status(400)
      .json({ success: false, error: 'registration-data-required' })
    return
  }

  try {
    const cardRegistrationResponse = await mangopay.CardRegistrations.update({
      Id: body.id,
      RegistrationData: body.registrationData,
    })

    if (cardRegistrationResponse.Status === 'ERROR') {
      res.status(400).json({ success: false, error: 'error' })
      return
    }

    res.status(200).json({ success: true })
    
  } catch (e) {
    console.log(e)
    res.status(500).json({ success: false, error: 'unexpected-exception' })
  }
}

export default withMethod('POST', completeCardRegistration)
