import App from '@components/App'
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { PageSpacing } from '@ui/PageSpacing'

export default function DocumentOwner(): JSX.Element {
  return (
    <App>
      <PageSpacing
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
        })}
      >
        <h1
          className={css({
            fontSize: 'xl',
            fontWeight: 'bold',
            fontFamily: 'nunitoSans',
            color: 'text',
          })}
        >
          ¡No puedes comprar tu propio documento!
        </h1>
        <p
          className={css({
            color: 'text',
            maxWidth: '50ch',
            textAlign: 'center',
          })}
        >
          Si quieres puedes descargar tu documento en el apartado Subido, en tu
          cuenta.
        </p>

        <ButtonLink
          href="/account/uploaded"
          className={css({
            mt: 'md',
          })}
        >
          Ir a Subido
        </ButtonLink>
      </PageSpacing>
    </App>
  )
}
