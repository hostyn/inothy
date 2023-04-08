import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import Loading from '@components/Loading'
import { useAuth } from '@context/authContext'
import { buy, getCards } from '@util/api'
import { logEvent } from '@config/firebase'
import { Button, Flex, Text } from '@ui'
import type { PaymentDetails, PaymentState } from '.'
import { type card } from 'mangopay2-nodejs-sdk'
import CardCard from './components/CardCard'
import AddCardCard from './components/AddCardCard'

// Fix fqb not defined
declare const window: any

const Title = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
  }
`

interface CardProps {
  setState: Dispatch<SetStateAction<PaymentState>>
  paymentDetails: PaymentDetails
  setPaymentDetails: Dispatch<SetStateAction<PaymentDetails>>
  onSuccess?: () => any
}

export default function Card({
  setState,
  paymentDetails,
  setPaymentDetails,
  onSuccess,
}: CardProps): JSX.Element {
  const { headers, updateData } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [cards, setCards] = useState<card.CardData[]>([])

  const handlePay = async (): Promise<void> => {
    setState('loading')
    try {
      if (headers == null) throw new Error('missing-headers')
      if (paymentDetails.cardId == null) throw new Error('missing-card')

      const res = await buy({
        cardId: paymentDetails.cardId,
        productsPaths: paymentDetails.documents.map(
          document => `${document.subject.id}/${document.id}`
        ),
        headers,
      })

      if (res.status === 'SUCCEEDED') {
        setState('success')
        await new Promise(resolve => setTimeout(resolve, 2000))
        await updateData()

        try {
          logEvent('purchase', {
            currency: 'EUR',
            value: paymentDetails.totalAmount,
          })

          window.ttq.track('CompletePayment', {
            currency: 'EUR',
            value: paymentDetails.totalAmount,
            contents: paymentDetails.documents.map(doc => ({
              content_id: doc.subject.id + '/' + doc.id,
            })),
          })

          window.fbq.track('CompletePayment', {
            currency: 'EUR',
            value: paymentDetails.totalAmount,
            contents: paymentDetails.documents.map(doc => ({
              content_id: doc.subject.id + '/' + doc.id,
            })),
          })
        } catch {}

        if (onSuccess != null) {
          onSuccess()
          return
        }
      }

      if (res.status === 'CREATED') {
        location.href = res.redirectUrl as string
      }

      throw new Error('unexpected-exception')
    } catch {
      setState('error')
    }
  }

  const handleDeleteCard = async (): Promise<void> => {
    const cards = await getCards()
    setCards(cards)
    setPaymentDetails(paymentDetails => ({ ...paymentDetails, cardId: null }))
  }

  useEffect(() => {
    if (!isLoading) return
    getCards()
      .then(cards => {
        setCards(cards)
        setIsLoading(false)
      })
      .catch(() => {})
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <Flex height="100%" width="100%">
      <Title fontSize="2rem" fontWeight="bold" margin="0 0 1rem 0">
        Seleccione una tarjeta
      </Title>
      <CardGrid>
        {cards.map(card => (
          <CardCard
            key={card.Id}
            card={card}
            selected={card.Id === paymentDetails.cardId}
            onDelete={handleDeleteCard}
            onClick={() => {
              setPaymentDetails(data => {
                return { ...data, cardId: card.Id }
              })
            }}
          />
        ))}
        <AddCardCard
          onClick={() => {
            setState('addCard')
          }}
        />
      </CardGrid>
      <Button
        margin="1rem auto"
        height="auto"
        padding="0.5rem 1rem"
        disabled={paymentDetails.cardId == null}
        onClick={handlePay}
      >
        Pagar
      </Button>
    </Flex>
  )
}
