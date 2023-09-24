import protectedContent from '@middleware/protectedContent'
import protectedContentSSR from '@middleware/protectedContentSSR'
import Balance from '@views/Account/Balance'
import { type NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Balance - Inothy</title>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <Balance />
    </>
  )
}

export default protectedContent(Page)
export const getServerSideProps = protectedContentSSR()
