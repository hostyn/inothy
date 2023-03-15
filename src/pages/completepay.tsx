import CompletePayPage from '@views/CompletePay'
import ProtectedContent from '@components/ProtectedContent'
import Head from 'next/head'
import { type GetServerSideProps } from 'next'

interface CompletePayProps {
  transactionId: string
}

export default function CompletePay({
  transactionId,
}: CompletePayProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - Completar pago</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ProtectedContent>
        <CompletePayPage transactionId={transactionId} />
      </ProtectedContent>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: transactionId,
}) => {
  return { props: transactionId }
}
