import Head from 'next/head'
import HomeView from '@views/Home'
import { withAuthUser } from 'next-firebase-auth'
import { trpc } from '@services/trpc'

function Home(): JSX.Element {
  const test = trpc.auth.test.useQuery()

  console.log(test.data)

  return (
    <>
      <Head>
        <title>Inothy: Prepárate para aprobar</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <HomeView />
    </>
  )
}

export default withAuthUser()(Home)
