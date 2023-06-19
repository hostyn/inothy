import Head from 'next/head'
import HomeView from '@views/Home'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

function Home(): JSX.Element {
  const user = useAuthUser()
  console.log(user)

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
