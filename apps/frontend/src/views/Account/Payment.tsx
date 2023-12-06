import useAuth from '@hooks/useAuth'
import BillingInfo from './components/BillingInfo'
import AccountLayout from './layouts/AccountLayout'
import { IoCardOutline } from 'react-icons/io5'
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'

export default function Payment(): JSX.Element {
  const { userData } = useAuth()

  return (
    <AccountLayout selected="payment">
      {userData?.canBuy ?? false ? (
        <BillingInfo />
      ) : (
        <div
          className={css({
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 'md',
            color: 'primary.500',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDir: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'sm',
              textAlign: 'center',
              lineHeight: '125%',
            })}
          >
            <IoCardOutline size={32} />
            <h2
              className={css({
                fontWeight: 'bold',
              })}
            >
              Aún no has comprado nada
            </h2>
            <p>
              Aquí aparecerá tu información de pago cuando hagas tu primera
              compra.
            </p>
          </div>

          <ButtonLink href="/">Buscar apuntes</ButtonLink>
        </div>
      )}
    </AccountLayout>
  )
}
