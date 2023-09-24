import protectedContent from '@middleware/protectedContent'
import protectedContentSSR from '@middleware/protectedContentSSR'
import Security from '@views/Account/Security'
import { type NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ajustes de seguridad - Inothy</title>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <Security />
    </>
  )
}

export default protectedContent(Page)
export const getServerSideProps = protectedContentSSR()
