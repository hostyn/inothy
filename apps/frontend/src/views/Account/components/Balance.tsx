import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { currencyFormatter } from '@util/normailize'
import GenericSectionLayout from '../layouts/GenericSectionLayout'
import { useState } from 'react'
import Spinner from '@components/Spinner'
import { toastError, toastSuccess } from '@services/toaster'
import useAuth from '@hooks/useAuth'

export default function Balance(): JSX.Element {
  const [open, setOpen] = useState(false)
  const { userData } = useAuth()

  const { data: balance } = trpc.auth.getUserBalance.useQuery()
  const { data: bankAccount } = trpc.auth.getBankAccount.useQuery()
  const requestPayout = trpc.auth.requestPayout.useMutation({
    onSuccess: () => {
      toastSuccess('Retiro solicitado con éxito.')
    },
    onError: () => {
      toastError('Ha ocurrido un errror al solicitar el retiro.')
    },
  })

  const onSubmit = async (): Promise<void> => {
    requestPayout.mutate()
  }

  return (
    <GenericSectionLayout
      bottomText={
        bankAccount?.iban == null
          ? 'Debes añadir una cuenta bancaria antes de poder retirar tu dinero.'
          : 'Los retiros pueden tardar hasta 3 días hábiles en reflejarse en tu cuenta bancaria.'
      }
      buttonContent={
        requestPayout.isLoading ? (
          <Spinner className={css({ my: 'xs', mx: 'auto' })} />
        ) : (
          <>
            Retirar{' '}
            <span
              className={css({
                display: 'none',
                md: { display: 'inline' },
              })}
            >
              dinero
            </span>
          </>
        )
      }
      dialogTitle="¿Retirar dinero?"
      disabled={
        userData?.kycLevel !== 'REGULAR' ||
        bankAccount?.iban == null ||
        requestPayout.isLoading
      }
      buttonTitle={
        userData?.kycLevel !== 'REGULAR'
          ? 'Debes verificar tu identidad para poder retirar tu dinero.'
          : bankAccount?.iban == null
          ? 'Debes añadir tu IBAN primero.'
          : undefined
      }
      dialogDescription={`¿Estás seguro que quieres retirar ${currencyFormatter.format(
        balance ?? 0
      )} de tu saldo a tu cuenta bancaria ${bankAccount?.iban ?? ''}?`}
      onSubmit={e => {
        e.preventDefault()
        setOpen(true)
      }}
      dialogOnConfirm={onSubmit}
      open={open}
      onOpenChange={state => {
        if (!state) setOpen(false)
      }}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 'md',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 'sm',
          })}
        >
          <h2 className={css({ color: 'text', fontWeight: '700' })}>Saldo</h2>
          <p
            className={css({
              fontSize: 'sm',
              color: 'text',
              lineHeight: '120%',
            })}
          >
            Este es tu saldo actual en tu cuenta de Inothy. <br /> Puedes
            retirarlo a tu cuenta bancaria en cualquier momento.
          </p>
        </div>
        <span
          className={css({
            fontWeight: 'bold',
            fontSize: '2xl',
            color: 'text',
            fontFamily: 'nunitoSans',
          })}
        >
          {currencyFormatter.format(balance ?? 0)}
        </span>
      </div>
    </GenericSectionLayout>
  )
}
