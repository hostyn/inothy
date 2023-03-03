import { type IUser } from 'context/authContext'
import { logEvent } from '../config/firebase'
import { completeCardRegistration, createCardRegistration } from './api'

export default async function registerCard(
  user: IUser,
  cardNumber: string,
  expirationDate: string,
  cvx: string
): Promise<void> {
  if (cardNumber.length === 0) throw new Error('Card Number is required')
  if (expirationDate.length === 0)
    throw new Error('Expiration Date is required')
  if (cvx.length === 0) throw new Error('CVX is required')

  try {
    const cardRegistration = await createCardRegistration(user)

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

    await completeCardRegistration(cardRegistration.Id, registrationData)
    try {
      logEvent('add_card')
    } catch {}

    return
  } catch {
    throw new Error('Internal server error')
  }
}
