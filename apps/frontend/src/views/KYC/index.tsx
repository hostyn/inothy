import App from '@components/App'
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { PageSpacing } from '@ui/PageSpacing'
import { FaRegAddressCard } from 'react-icons/fa'
import KYCForm from './KYCForm'
import { ButtonLink } from '@ui/Button'

export default function KYC(): JSX.Element {
  const { data: kycStatus } = trpc.auth.getKYCStatus.useQuery()

  return (
    <App>
      {kycStatus?.userType !== 'OWNER' ? (
        <PageSpacing
          className={css({
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'sm',
            textAlign: 'center',
            lineHeight: '125%',
            color: 'text',
          })}
        >
          <FaRegAddressCard size={32} />
          <h1
            className={css({
              fontWeight: 'bold',
            })}
          >
            No tienes que pasar el KYC
          </h1>
          <p>
            Solo necesitamos que pases el KYC si eres vendedor en nuestra
            plataforma.
          </p>
          <ButtonLink href="/">Volver al home</ButtonLink>
        </PageSpacing>
      ) : kycStatus.kycLevel === 'REGULAR' ? (
        <PageSpacing
          className={css({
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'sm',
            textAlign: 'center',
            lineHeight: '125%',
            color: 'text',
          })}
        >
          <FaRegAddressCard size={32} />
          <h1
            className={css({
              fontWeight: 'bold',
            })}
          >
            Ya has pasado el KYC
          </h1>
          <p
            className={css({
              maxWidth: '50ch',
            })}
          >
            ¡Ya puedes retirar tu dinero de nuestra plataforma! No necesitamos
            mas datos.
          </p>
          <ButtonLink href="/account/balance">Ver mi balance</ButtonLink>
        </PageSpacing>
      ) : kycStatus.kycStatus === 'VALIDATION_ASKED' ? (
        <PageSpacing
          className={css({
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'sm',
            textAlign: 'center',
            lineHeight: '125%',
            color: 'text',
          })}
        >
          <FaRegAddressCard size={32} />
          <h1
            className={css({
              fontWeight: 'bold',
            })}
          >
            Estamos validando tus documentos
          </h1>
          <p
            className={css({
              maxWidth: '50ch',
            })}
          >
            Te noficaremos cuando esté todo listo. Mientras, ¡puedes subir más
            apuntes!
          </p>
          <ButtonLink href="/upload">Subir apuntes</ButtonLink>
        </PageSpacing>
      ) : (
        <KYCForm />
      )}
    </App>
  )
}
