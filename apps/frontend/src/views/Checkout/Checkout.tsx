/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react'
import { css } from '@styled-system/css'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'
import { useRouter } from 'next/router'
import App from '@components/App'
import Spinner from '@components/Spinner'
import PageLayout from '@ui/PageLayout'
import { Button } from '@ui/Button'
import { trpc } from '@services/trpc'
import { toastError } from '@services/toaster'
import { currencyFormatter } from '@util/normailize'
import { useCheckoutDocument } from '@hooks/useCheckoutDocument'
import Billing from './components/Billing'
import Card from './components/Card'
import DocumentCard from '@components/DocumentCard'
import { usePostHog } from 'posthog-js/react'

interface CheckoutDocumentProps {
  documentId: string
  accept: string
}

export default function Checkout({
  documentId,
  accept,
}: CheckoutDocumentProps): JSX.Element {
  const posthog = usePostHog()
  const { push } = useRouter()

  const { data: document } = trpc.document.getDocument.useQuery({
    id: documentId,
  })
  const { data: userFullData } = trpc.auth.getUserFullData.useQuery()
  const { data: userCards } = trpc.auth.getUserCards.useQuery()
  const trpcContext = trpc.useContext()

  const checkoutDocument = useCheckoutDocument()

  const [card, setCard] = useState<null | string>(userCards?.[0]?.id ?? null)
  const [loading, setLoading] = useState(false)

  const handlePay = async (): Promise<void> => {
    if (card == null) {
      return
    }

    setLoading(true)

    try {
      const response = await checkoutDocument({
        accept,
        cardId: card,
        documentId,
        documentPrice: document?.price ?? 0,
      })

      if (response.state === 'success') {
        await push('/receipt/' + response.id)
        posthog.capture('document_bought', {
          documentId,
          frictionLess: true,
          documentTitle: document?.title,
          documentPrice: document?.price,
          documentType: document?.documentType,
          contentType: document?.contentType,
          subjectId: document?.subject.id,
          subjectName: document?.subject.name,
          universityId: document?.subject.university.id,
          universityName: document?.subject.university.name,
          documentRating:
            document?.ratingSum != null && document?.ratingCount != null
              ? document.ratingSum / document.ratingCount
              : null,
        })
      }

      if (response.state === 'created') {
        await push(response.redirectUrl ?? '')
        posthog.capture('document_bought', {
          documentId,
          frictionLess: false,
          documentTitle: document?.title,
          documentPrice: document?.price,
          documentType: document?.documentType.name,
          contentType: document?.contentType,
          subjectId: document?.subject.id,
          subjectName: document?.subject.name,
          universityId: document?.subject.university.id,
          universityName: document?.subject.university.name,
          documentRating:
            document?.ratingSum != null && document?.ratingCount != null
              ? document.ratingSum / document.ratingCount
              : null,
        })
      }
    } catch (e) {
      setLoading(false)

      if (e.message === 'document-already-bought') {
        toastError('Ya has comprado el documento.')
        return
      }
      if (e.message === 'document-price-mismatch') {
        toastError('El precio del documento ha cambiado.')
        await trpcContext.document.getDocument.invalidate({ id: documentId })
        return
      }

      if (e.message === 'card-not-found') {
        toastError(
          'Se ha producido un error con el metodo de pago. Intentalo de nuevo más tarde.'
        )
        return
      }

      toastError('Error al comprar el documento. Intentalo de nuevo más tarde.')
    }
  }

  return (
    <App>
      <PageLayout title="Checkout" Icon={MdOutlineShoppingCartCheckout}>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '1fr 2px 1fr',
            gap: 'lg',
            maxWidth: '100%',
            flexGrow: 1,
            alignContent: 'center',
            alignItems: 'center',
          })}
        >
          {/* LEFT SIDE */}
          <section
            className={css({
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              gap: '2xl',
              justifyContent: 'center',
            })}
          >
            <h2
              className={css({
                fontSize: 'lg',
                fontWeight: 'bold',
                color: 'grey.400',
                letterSpacing: '-0.03em',
              })}
            >
              Resumen del pedido
            </h2>

            <DocumentCard {...document!} />

            <span
              className={css({
                textAlign: 'right',
                color: 'text',
                fontWeight: 'bold',
                fontSize: 'xl',
              })}
            >
              Total: {currencyFormatter.format(document?.price ?? 0)}
            </span>
          </section>

          <div
            className={css({
              bg: 'grey.100',
            })}
          ></div>

          {/* RIGHT SIDE */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'xl',
            })}
          >
            <Billing />
            <Card card={card} setCard={setCard} />
            <Button
              onClick={handlePay}
              disabled={
                !(userFullData?.canBuy ?? false) || card == null || loading
              }
              className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'sm',
              })}
            >
              {loading ? (
                <>
                  Procesando <Spinner />
                </>
              ) : (
                `Pagar ${currencyFormatter.format(document?.price ?? 0)}`
              )}
            </Button>
          </div>
        </div>
      </PageLayout>
    </App>
  )
}
