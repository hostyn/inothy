import { trpc } from '@services/trpc'
import { useState } from 'react'

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

interface Card {
  cardNumber: string
  expMonth: string
  expYear: string
  cvx: string
}

type RegisterCard = (card: Card) => Promise<string>

interface UseRegisterCard {
  registerCard: RegisterCard
  loading: boolean
}

const useRegisterCard = (): UseRegisterCard => {
  const [loading, setLoading] = useState(false)
  const trpcContext = trpc.useContext()

  const createCardRegistration = trpc.auth.createCardRegistration.useMutation()
  const completeCardRegistration =
    trpc.auth.completeCardRegistration.useMutation()

  const registerCard: RegisterCard = async card => {
    setLoading(true)
    const cardPreregistration = await createCardRegistration.mutateAsync()

    const cardRegistration = await fetch(
      cardPreregistration.cardRegistrationURL,
      {
        method: 'POST',

        body: new URLSearchParams({
          data: cardPreregistration.preregistrationData,
          accessKeyRef: cardPreregistration.accessKey,
          cardNumber: card.cardNumber,
          cardExpirationDate: `${card.expMonth}${card.expYear}`,
          cardCvx: card.cvx,
        }),
      }
    )

    if (!cardRegistration.ok) {
      throw new Error('unexpected-error')
    }

    const registrationData = await cardRegistration.text()

    if (registrationData.match(/errorCode/) != null) {
      const errorCode = registrationData.split('=')[1] as keyof typeof ERRORS
      throw new Error(ERRORS[errorCode])
    }

    const completeCardResponse = await completeCardRegistration.mutateAsync(
      {
        id: cardPreregistration.id,
        registrationData,
      },
      {
        onSuccess: async () => {
          await trpcContext.auth.getUserCards.invalidate()
        },
      }
    )

    setLoading(false)
    return completeCardResponse.id
  }

  return { registerCard, loading }
}

export default useRegisterCard
