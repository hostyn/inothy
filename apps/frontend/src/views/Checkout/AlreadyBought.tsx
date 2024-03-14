/* eslint-disable @typescript-eslint/no-non-null-assertion */
import App from '@components/App'
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { PageSpacing } from '@ui/PageSpacing'
import { ButtonLink } from '@ui/Button'
import DocumentCard from '@components/DocumentCard'

export default function AlreadyBought({
  documentId,
}: {
  documentId: string
}): JSX.Element {
  const { data: documentData } = trpc.document.getDocument.useQuery({
    id: documentId,
  })

  return (
    <App>
      <PageSpacing
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
          gap: 'xl',
          w: '4xl',
          maxW: '100%',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          <h1
            className={css({
              fontSize: 'xl',
              color: 'text',
              fontFamily: 'nunitoSans',
              fontWeight: '600',
            })}
          >
            ¡Ya has comprado este documento!
          </h1>
          <p
            className={css({
              fontSize: 'md',
              color: 'text',
              textAlign: 'center',
              maxW: '60ch',
              lineHeight: '1.3',
            })}
          >
            No hace falta que lo vuelvas a comprar. Recuerda que puedes volver a
            descargarlos desde el apartado de comprado dentro de tu cuenta.
          </p>
        </div>
        <DocumentCard {...documentData!} />
        <div
          className={css({
            display: 'flex',
            gap: 'lg',
          })}
        >
          <ButtonLink href="/" visual="secondary">
            Volver al home
          </ButtonLink>
          <ButtonLink href="/account/purchased">Ver mis compras</ButtonLink>
        </div>
      </PageSpacing>
    </App>
  )
}
