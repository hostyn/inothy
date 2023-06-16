import { logEvent } from '@config/firebase'
import { completeCardRegistration, createCardRegistration } from './api'

const ERRORS = {
  '02625': 'invalid-card-number',
  '02626': 'invalid-date',
  '02627': 'invalid-cvv',
  '02628': 'unexpected-exception',
  '02101': 'unexpected-exception',
  '02632': 'unexpected-exception',
  '09101': 'unexpected-exception',
  '09102': 'unexpected-exception',
  '01902': 'not-active-card',
  '02624': 'card-expired',
  '09104': 'unexpected-exception',
  '09201': 'unexpected-exception',
  '02631': 'unexpected-exception',
}

export default async function registerCard(
  cardNumber: string,
  expirationDate: string,
  cvx: string
): Promise<void> {
  if (cardNumber.length === 0) throw new Error('card-number-required')
  if (expirationDate.length === 0) throw new Error('expiration-date-required')
  if (cvx.length === 0) throw new Error('cvx-required')

  const cardRegistration = await createCardRegistration()

  const response = await fetch(cardRegistration.CardRegistrationUrl, {
    method: 'POST',
    body: new URLSearchParams({
      data: cardRegistration.PreregistrationData,
      accessKeyRef: cardRegistration.AccessKey,
      cardNumber,
      cardExpirationDate: expirationDate,
      cardCvx: cvx,
    }),
  })

  const registrationData = await response.text()

  if (registrationData.match(/errorCode/) != null) {
    const errorCode = registrationData.split('=')[1] as keyof typeof ERRORS
    throw new Error(ERRORS[errorCode])
  }

  await completeCardRegistration(cardRegistration.Id, registrationData)
  try {
    logEvent('add_card')
  } catch {}
}
