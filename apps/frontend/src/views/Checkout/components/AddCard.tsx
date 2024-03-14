import { zodResolver } from '@hookform/resolvers/zod'
import useRegisterCard from '@hooks/useRegisterCard'
import { toastError, toastSuccess } from '@services/toaster'
import { trpc } from '@services/trpc'
import { css, cx } from '@styled-system/css'
import { Button } from '@ui/Button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiCreditCard1 } from 'react-icons/ci'
import { z } from 'zod'

const ERROR_CODES: Record<string, string> = {
  'invalid-card-number': 'Número de tarjeta inválido.',
  'invalid-date': 'Fecha de expiración inválida.',
  'invalid-cvv': 'CVV inválido.',
  'not-active-card': 'Tarjeta desactivada.',
  'card-expired': 'Tarjeta expirada.',
}

const loginSchema = z.object({
  cardNumber: z.string().min(8, 'min').max(19, 'max'),
  cvv: z.string().min(3, 'min').max(3, 'max'),
  expirationDate: z.string().min(1, 'min'),
})

type FormValues = z.infer<typeof loginSchema>

const createCardInputStyles = css({
  transition: 'box-shadow 150ms ease-in-out',
  color: 'grey.500',
  fontWeight: '600',
  p: '2px',

  _placeholder: {
    fontWeight: 'normal',
  },

  _focusVisible: {
    outline: 'none',
    boxShadow: '0 2px 0 token(colors.primary.300)',
  },
})

const createCardInputErrorStyles = css({
  boxShadow: '0 2px 0 token(colors.red.300)',

  _focusVisible: {
    outline: 'none',
    boxShadow: '0 2px 0 token(colors.red.300)',
  },
})

export default function AddCard({
  setCard,
}: {
  setCard: React.Dispatch<React.SetStateAction<string | null>>
}): JSX.Element {
  const { data: fullUserData } = trpc.auth.getUserFullData.useQuery()
  const [expirationDate, setExpirationDate] = useState('')
  const { registerCard, loading } = useRegisterCard()

  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(loginSchema),
  })

  const handleExpirationDateChange: React.ChangeEventHandler<
    HTMLInputElement
  > = ({ target }): void => {
    clearErrors('expirationDate')

    if (target.value === '') {
      setExpirationDate('')
      return
    }

    if (target.value.match(/^[\d\s/]+$/) == null) return

    if (target.value + ' ' === expirationDate) {
      setExpirationDate(target.value.replaceAll(' ', '').replaceAll('/', ''))
      return
    }

    const value = target.value.replaceAll(' ', '')
    let values = value.split('/')

    if (values.length === 1 && values[0].length === 3) {
      values = [values[0].slice(0, 2), values[0].slice(2)]
    }

    if (values[0].length > 2) return
    if (values.length > 1 && values[0].length < 2) return
    if (values[1]?.length > 2) return

    if (!['0', '1'].includes(values[0][0])) return
    if (Number(values[0]) > 12) return

    if (
      values.length === 1 &&
      values[0].length === 2 &&
      expirationDate + (value.at(-1) ?? '') === value
    ) {
      setExpirationDate(value + ' / ')
      return
    }

    setExpirationDate(values.join(' / '))
  }

  const onSubmit = async (data: FormValues): Promise<void> => {
    if (expirationDate.replaceAll(' ', '').match(/^\d{2}\/\d{2}$/) == null) {
      setError('root', { message: 'Fecha de expiración inválida.' })
      return
    }

    const [month, year] = expirationDate.replaceAll(' ', '').split('/')

    try {
      const cardId = await registerCard({
        cardNumber: data.cardNumber.toString(),
        expMonth: month,
        expYear: year,
        cvx: data.cvv,
      })

      setCard(cardId)

      toastSuccess('Tarjeta registrada con éxito.')
      reset()
      setExpirationDate('')
    } catch (e) {
      console.log(e.message)
      toastError(
        `No se ha podido registrar la tarjeta. ${ERROR_CODES[e.message] ?? ''}`
      )
      setError('root', { message: 'No se ha podido registrar la tarjeta.' })
    }
  }

  return (
    <form
      className={css({
        display: 'flex',
        gap: 'sm',
        alignItems: 'center',
        p: 'sm',
        borderRadius: 'md',
        border:
          errors.cardNumber != null || errors.cvv != null || errors.root != null
            ? '1px solid token(colors.red.200)'
            : '1px solid token(colors.grey.200)',
        transition: 'outline-width 150ms ease-in-out',

        _focusWithin: {
          outline:
            errors.cardNumber != null ||
            errors.cvv != null ||
            errors.root != null
              ? '2px solid token(colors.red.300)'
              : '2px solid token(colors.primary.300)',
          outlineOffset: '-1px',
        },
      })}
      onSubmit={handleSubmit(onSubmit)}
      title={
        !(fullUserData?.canBuy ?? false)
          ? 'Añade tu dirección de facturación primero.'
          : undefined
      }
    >
      <CiCreditCard1
        className={css({
          color: 'grey.400',
        })}
        size={36}
      />
      <input
        placeholder="Numero de la tarjeta"
        autoComplete="cc-number"
        disabled={!(fullUserData?.canBuy ?? false)}
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        {...register('cardNumber', {
          onChange: () => {
            clearErrors('cardNumber')
          },
        })}
        className={cx(
          css({
            width: '100%',

            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: '0',
            },
          }),
          createCardInputStyles,
          errors.cardNumber != null && createCardInputErrorStyles
        )}
      />
      <input
        placeholder="MM/YY"
        autoComplete="cc-exp"
        disabled={!(fullUserData?.canBuy ?? false)}
        className={cx(
          css({
            width: '5.9ch',
          }),
          createCardInputStyles,
          errors.expirationDate != null && createCardInputErrorStyles
        )}
        {...register('expirationDate')}
        value={expirationDate}
        onChange={handleExpirationDateChange}
      />
      <input
        placeholder="CVV"
        autoComplete="cc-csc"
        maxLength={3}
        disabled={!(fullUserData?.canBuy ?? false)}
        {...register('cvv', {
          onChange: () => {
            clearErrors('cvv')
          },
        })}
        className={cx(
          css({
            width: '3.8ch',
          }),
          createCardInputStyles,
          errors.cvv != null && createCardInputErrorStyles
        )}
      />
      <Button disabled={loading || !(fullUserData?.canBuy ?? false)}>
        Añadir
      </Button>
    </form>
  )
}
