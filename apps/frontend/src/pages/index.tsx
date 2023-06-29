import Head from 'next/head'
import { trpc } from '@services/trpc'
import publicContentSSR from '@middleware/publicContentSSR'
import publicContent from '@middleware/publicContent'
import { type NextPage } from 'next'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@config/firebase'
import { useAuthUser } from 'next-firebase-auth'
import { css } from '@styled-system/css'
import { Button } from '@ui/Button'
import { AiOutlineSearch } from 'react-icons/ai'
import App from '@components/App'

const Home: NextPage = () => {
  const userData = trpc.auth.getUserData.useQuery()

  console.log(userData.data)

  const user = useAuthUser()

  const handleLogin = async (): Promise<void> => {
    await signInWithEmailAndPassword(auth, 'test@test.com', 'test1234')
  }

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
