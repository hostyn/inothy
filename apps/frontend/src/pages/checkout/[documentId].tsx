import protectedContent from '@middleware/protectedContent'
import protectedContentSSR from '@middleware/protectedContentSSR'
import AlreadyBought from '@views/Checkout/AlreadyBought'
import Checkout from '@views/Checkout/Checkout'
import DocumentOwner from '@views/Checkout/DocumentOwner'
import Head from 'next/head'

interface Props {
  documentId: string
  documentOwner: boolean
  accept: string
  bought: boolean
}

function Page({
  documentId,
  documentOwner,
  accept,
  bought,
}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Comprar - Inothy</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      {documentOwner ? (
        <DocumentOwner />
      ) : bought ? (
        <AlreadyBought documentId={documentId} />
      ) : (
        <Checkout documentId={documentId} accept={accept} />
      )}
    </>
  )
}

export default protectedContent(Page)

export const getServerSideProps = protectedContentSSR(
  async ({ helper, query, AuthUser, req }) => {
    const { documentId } = query

    if (typeof documentId !== 'string') {
      return { notFound: true }
    }

    try {
      const document = await helper.document.getDocument.fetch({
        id: documentId,
      })

      if (document == null) {
        return { notFound: true }
      }

      if (document.user.uid === AuthUser?.id) {
        return { props: { documentId, documentOwner: true } }
      }

      await Promise.all([
        helper.auth.getUserFullData.prefetch(),
        helper.auth.getUserCards.prefetch(),
      ])

      return {
        props: {
          documentId,
          accept: req.headers.accept,
          documentOwner: false,
          bought: document.bought,
        },
      }
    } catch (error) {
      return { notFound: true }
    }
  }
)
