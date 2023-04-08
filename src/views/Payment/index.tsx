import { useState } from 'react'
import Resume from './Resume'
import Card from './Card'
import AddCard from './AddCard'
import Loading from '../../components/Loading'
import MotionDiv from '@components/MotionDiv'
import { type FullDocumentInfo } from 'types/api'
import ErrorSuccess from '@components/ErrorSuccessPage'

export interface PaymentDetails {
  cardId: null | string
  totalAmount: number
  documents: FullDocumentInfo[]
}

export type PaymentState =
  | 'resume'
  | 'card'
  | 'addCard'
  | 'loading'
  | 'cardSuccess'
  | 'success'
  | 'error'

interface PaymentProps {
  documents: FullDocumentInfo[]
  onSuccess?: any
}

export default function Payment({
  documents,
  onSuccess = null,
}: PaymentProps): JSX.Element {
  const [state, setState] = useState<PaymentState>('cardSuccess')

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardId: null,
    totalAmount: documents.reduce((prev, current) => prev + current.price, 0),
    documents,
  })

  return (
    <MotionDiv state={state}>
      {state === 'resume' && (
        <Resume paymentDetails={paymentDetails} setState={setState} />
      )}

      {state === 'card' && (
        <Card
          setState={setState}
          paymentDetails={paymentDetails}
          setPaymentDetails={setPaymentDetails}
          onSuccess={onSuccess}
        />
      )}
      {state === 'addCard' && <AddCard setState={setState} />}

      {state === 'loading' && <Loading />}

      {state === 'cardSuccess' && (
        <ErrorSuccess
          type="success"
          title="Tarjeta añadida"
          subtitle="Ya puedes utilizar la tarjeta para comprar en Inothy."
        />
      )}

      {state === 'success' && (
        <ErrorSuccess
          type="success"
          title="Comprado"
          subtitle="Gracias por comprar con nosotros."
        />
      )}

      {state === 'error' && (
        <ErrorSuccess
          type="error"
          title="Ha habido un problema"
          subtitle="Intentalo mas tarde o contacta con el soporte."
        />
      )}
    </MotionDiv>
  )
}
