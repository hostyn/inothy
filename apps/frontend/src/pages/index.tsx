import Head from 'next/head'
import HomeView from '@views/Home'
import { trpc } from '@services/trpc'

export default function Home(): JSX.Element {
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
