import Head from 'next/head'
import { trpc } from '@services/trpc'
import publicContentSSR from '@middleware/publicContentSSR'
import publicContent from '@middleware/publicContent'
import { type NextPage } from 'next'

const Home: NextPage = () => {
  const test = trpc.auth.test.useQuery()

  console.log(test.data)

  return (
    <>
      <Head>
        <title>Inothy: Prepárate para aprobar</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <h1>home</h1>
      {/* <HomeView /> */}
    </>
  )
}

export default publicContent(Home)
export const getServerSideProps = publicContentSSR(
  async ({ AuthUser, helper }) => {
    return {
      props: {},
    }
  }
)
