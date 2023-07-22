import protectedContent from '@middleware/protectedContent'
import protectedContentSSR from '@middleware/protectedContentSSR'
import General from '@views/Account/General'
import { type NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ajustes de la cuenta - Inothy</title>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <General />
    </>
  )
}

export default protectedContent(Page)
export const getServerSideProps = protectedContentSSR()
