import protectedContent from '@middleware/protectedContent'
import protectedContentSSR from '@middleware/protectedContentSSR'
import Uploaded from '@views/Account/Uploaded'
import { type NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Subido - Inothy</title>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <Uploaded />
    </>
  )
}

export default protectedContent(Page)
export const getServerSideProps = protectedContentSSR()
