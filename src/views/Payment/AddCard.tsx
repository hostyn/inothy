import styled from 'styled-components'
import { type Dispatch, type SetStateAction, useState } from 'react'
import registerCard from '@util/cardregistration'
import { colors } from '@config/theme'
import { Button, Flex, Input, Text } from '@ui'
import type { PaymentState } from '.'
import { useForm } from 'react-hook-form'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 1rem;
`

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 0 0;

  @media (max-width: 768px) {
    & button {
      font-size: 1rem;
    }
  }
`

interface FormValues {
  cardNumber: string
  expirationMonth: string
  expirationYear: string
  cvx: string
}

interface AddCardProps {
  setState: Dispatch<SetStateAction<PaymentState>>
}

export default function AddCard({ setState }: AddCardProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<FormValues>({ mode: 'onBlur', reValidateMode: 'onBlur' })

  const onSubmit = async (values: FormValues): Promise<void> => {
    setLoading(true)

    try {
      await registerCard(
        values.cardNumber,
        `${values.expirationMonth}${values.expirationYear}`,
        values.cvx
      )

      setState('cardSuccess')
      await new Promise((resolve, reject) => setTimeout(resolve, 2000))
      setState('card')
    } catch (error) {
      if (error.message === 'card-expired') {
        setError(
          'cardNumber',
          { message: 'La tarjeta ha expirado.' },
          { shouldFocus: true }
        )
      }

      if (error.message === 'not-active-card') {
        setError(
          'cardNumber',
          { message: 'La tarjeta no está activa.' },
          { shouldFocus: true }
        )
      }

      if (error.message === 'invalid-cvv') {
        setError(
          'cvx',
          { message: 'El CVV no es válido.' },
          { shouldFocus: true }
        )
      }

      if (error.message === 'invalid-date') {
        setError(
          'expirationMonth',
          { message: 'La fecha no es correcta.' },
          { shouldFocus: true }
        )
        setError(
          'expirationYear',
          { message: 'La fecha no es correcta.' },
          { shouldFocus: true }
        )
      }

      if (error.message === 'invalid-card-number') {
        setError(
          'cardNumber',
          { message: 'El número no es válido.' },
          { shouldFocus: true }
        )
      }

      if (error.message === 'unexpected-exception') {
        setError(
          'cardNumber',
          { message: 'Ha ocurrido un error.' },
          { shouldFocus: true }
        )
      }

      setLoading(false)
    }
  }

  return (
    <Flex height="100%" width="100%">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="2rem" fontWeight="bold" margin="0 0 1rem 0">
          Añadir tarjeta
        </Text>
        <div>
          <Input
            placeholder="Número de la tarjeta"
            type="number"
            autoComplete="off"
            {...register('cardNumber', {
              required: 'El número de tarjeta es obligatorio.',
              maxLength: {
                value: 18,
                message: 'La tarjeta es demasiado larga.',
              },
              minLength: {
                value: 13,
                message: 'La tarjeta es demasiado corta.',
              },
              onChange: () => {
                clearErrors('cardNumber')
              },
            })}
            error={errors.cardNumber}
          />
          <InputGrid>
            <Input
              placeholder="Mes de expiración"
              type="number"
              autoComplete="off"
              {...register('expirationMonth', {
                required: 'El mes de expiración es obligatorio.',
                minLength: {
                  value: 2,
                  message: 'El mes es demasiado corto.',
                },
                maxLength: {
                  value: 2,
                  message: 'El mes es demasiado largo.',
                },
                onChange: () => {
                  clearErrors('expirationMonth')
                },
              })}
              error={errors.expirationMonth}
            />
            <Input
              placeholder="Año de expiración"
              type="number"
              autoComplete="off"
              {...register('expirationYear', {
                required: 'El año de expiración es obligatorio.',
                minLength: {
                  value: 2,
                  message: 'El año es demasiado corto.',
                },
                maxLength: {
                  value: 2,
                  message: 'El año es demasiado largo.',
                },
                onChange: () => {
                  clearErrors('expirationYear')
                },
              })}
              error={errors.expirationYear}
            />
            <Input
              placeholder="CVV"
              type="number"
              autoComplete="off"
              {...register('cvx', {
                required: 'El CVV es obligatorio.',
                minLength: {
                  value: 3,
                  message: 'El CVV es demasiado corto.',
                },
                maxLength: {
                  value: 3,
                  message: 'El CVV es demasiado largo.',
                },
                onChange: () => {
                  clearErrors('cvx')
                },
              })}
              error={errors.cvx}
            />
          </InputGrid>
        </div>

        <ButtonsDiv>
          <Button
            type="button"
            margin="0"
            background="white"
            color="secondary"
            border={`2px solid ${colors.secondary}`}
            onClick={() => {
              setState('card')
            }}
          >
            Volver
          </Button>
          <Button margin="0 0 0 auto" loading={loading} background="primary">
            Añadir tarjeta
          </Button>
        </ButtonsDiv>
      </Form>
    </Flex>
  )
}
