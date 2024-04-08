import App from '@components/App'
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { PageSpacing } from '@ui/PageSpacing'
import { ButtonLink } from '@ui/Button'
import DocumentCard from '@components/DocumentCard'

export default function Receipt({
  receiptId,
}: {
  receiptId: string
}): JSX.Element {
  const { data: receipt } = trpc.checkout.getReceipt.useQuery({ receiptId })

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
        })}
      >
        {receipt?.status === 'SUCCEEDED' && (
          <>
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
                ¡Compra realizada con éxito!
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
                Ya puedes descargar tus documentos. Recuerda que puedes volver a
                descargarlos desde el apartado de comprado dentro de tu cuenta.
              </p>
            </div>
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',

                alignItems: 'center',
                gap: 'lg',
                width: '100%',
                maxWidth: '100%',
              })}
            >
              {receipt?.documentTransactions.map(transaction => (
                <DocumentCard
                  key={transaction.id}
                  {...transaction.document}
                  bought={true}
                />
              ))}
            </div>
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
          </>
        )}

        {receipt?.status === 'FAILED' && (
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
              Compra fallida
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
              La transacción ha sido cancelada o ha fallado. Por favor,
              inténtalo de nuevo.
            </p>
          </div>
        )}
      </PageSpacing>
    </App>
  )
}
