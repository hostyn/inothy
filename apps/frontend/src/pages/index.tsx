import Head from 'next/head'
import publicContentSSR from '@middleware/publicContentSSR'
import publicContent from '@middleware/publicContent'
import { type NextPage } from 'next'
import App from '@components/App'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inothy: Prepárate para aprobar</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <App>
        <h1>home</h1>
      </App>
    </>
  )
}

export default publicContent(Home)
export const getServerSideProps = publicContentSSR()
