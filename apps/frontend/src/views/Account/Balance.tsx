import AccountLayout from './layouts/AccountLayout'
import BalanceSection from './components/Balance'
import IBAN from './components/IBAN'
import useAuth from '@hooks/useAuth'
import { IoWalletOutline } from 'react-icons/io5'
import { css } from '@styled-system/css'
import KYCNeededBanner from './components/KYCNeededBanner'
import KYCPendingBanner from './components/KYCPendingBanner'

export default function Balance(): JSX.Element {
  const { userData } = useAuth()

  console.log(userData)

  return (
    <AccountLayout selected="balance">
      {userData?.canUpload ?? false ? (
        <>
          {/* TODO: KYC ERROR */}
          {userData?.kycLevel !== 'REGULAR' ? (
            userData?.kycStatus === 'VALIDATION_ASKED' ? (
              <KYCPendingBanner />
            ) : (
              <KYCNeededBanner />
            )
          ) : (
            <KYCNeededBanner />
          )}

          <BalanceSection />
          <IBAN />
        </>
      ) : (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'sm',
            p: 'md',
            color: 'text',
          })}
        >
          <IoWalletOutline size={24} />
          <h2
            className={css({
              fontWeight: '700',
            })}
          >
            Aún no has subido nada
          </h2>
          <p
            className={css({
              maxW: '50ch',
              textAlign: 'center',
            })}
          >
            Aquí aparecerá información sobre tus ganancias en la plataforma una
            vez hayas subido tu primer documento.
          </p>
        </div>
      )}
    </AccountLayout>
  )
}
