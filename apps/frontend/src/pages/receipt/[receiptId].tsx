import protectedContent from '@middleware/protectedContent'
import protectedContentSSR from '@middleware/protectedContentSSR'
import Receipt from '@views/Checkout/Receipt'
import Head from 'next/head'

interface PageProps {
  receiptId: string
}

function Page({ receiptId }: PageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Recibo - Inothy</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Receipt receiptId={receiptId} />
    </>
  )
}

export default protectedContent(Page)

export const getServerSideProps = protectedContentSSR(
  async ({ helper, query }) => {
    const { receiptId } = query

    if (typeof receiptId !== 'string') {
      return { notFound: true }
    }
    try {
      await helper.checkout.getReceipt.fetch({ receiptId })
    } catch {
      return { notFound: true }
    }

    return { props: { receiptId } }
  }
)
