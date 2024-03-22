import protectedContent from '@middleware/protectedContent'
import Callback from '@views/Checkout/Callback'
import { type GetServerSideProps } from 'next'
import Head from 'next/head'

interface Props {
  transactionId: string
}

function Page({ transactionId }: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Comprar - Inothy</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Callback transactionId={transactionId} />
    </>
  )
}

export default protectedContent(Page)

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { transactionId: query.transactionId },
  }
}
