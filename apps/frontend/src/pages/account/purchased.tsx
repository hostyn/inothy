import protectedContent from '@middleware/protectedContent'
import protectedContentSSR from '@middleware/protectedContentSSR'
import Purchased from '@views/Account/Purchased'
import { type NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Comprado - Inothy</title>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <Purchased />
    </>
  )
}

export default protectedContent(Page)
export const getServerSideProps = protectedContentSSR()
