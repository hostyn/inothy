import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { currencyFormatter } from '@util/normailize'
import GenericSectionLayout from '../layouts/GenericSectionLayout'
import { useState } from 'react'

export default function Balance(): JSX.Element {
  const [open, setOpen] = useState(false)

  const { data: balance } = trpc.auth.getUserBalance.useQuery()
  const { data: bankAccount } = trpc.auth.getBankAccount.useQuery()

  const onSubmit = async (): Promise<void> => {
    console.log('hola')
  }

  return (
    <GenericSectionLayout
      bottomText={
        bankAccount?.iban == null
          ? 'Debes añadir una cuenta bancaria antes de poder retirar tu dinero.'
          : 'Los retiros pueden tardar hasta 3 días hábiles en reflejarse en tu cuenta bancaria.'
      }
      buttonContent="Retirar dinero"
      dialogTitle="¿Retirar dinero?"
      disabled={bankAccount?.iban == null}
      buttonTitle={
        bankAccount?.iban == null ? 'Debes añadir tu IBAN primero.' : undefined
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
