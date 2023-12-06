import protectedContent from '@middleware/protectedContent'
import protectedContentSSR from '@middleware/protectedContentSSR'
import Payment from '@views/Account/Payment'
import { type NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ajustes de pagos - Inothy</title>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <Payment />
    </>
  )
}

export default protectedContent(Page)
export const getServerSideProps = protectedContentSSR(async ({ helper }) => {
  await helper.auth.getBillingData.prefetch()
  return { props: {} }
})
