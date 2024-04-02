import App from '@components/App'
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { PageSpacing } from '@ui/PageSpacing'

export default function VerifyEmail({
  verified,
}: {
  verified: boolean
}): JSX.Element {
  return (
    <App>
      <PageSpacing
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          gap: 'sm',
        })}
      >
        <h1
          className={css({
            fontSize: 'xl',
            fontWeight: 'bold',
            fontFamily: 'nunitoSans',
            color: 'text',
            lineHeight: '1.1',
          })}
        >
          {verified
            ? '¡Gracias por verificar tu email!'
            : 'Email no verificado'}
        </h1>
        <p
          className={css({
            maxWidth: '50ch',
            textAlign: 'center',
          })}
        >
          {verified
            ? 'Al verificar tu email haces que tu cuenta sea mas segura.'
            : 'Puede que el enlace de verificación haya expirado o sea inválido. Puedes solicitar otro enlace de verificación en la configuración de tu cuenta.'}
        </p>
        <ButtonLink
          className={css({
            mt: 'md',
          })}
          href="/"
        >
          Volver al inicio
        </ButtonLink>
      </PageSpacing>
    </App>
  )
}
