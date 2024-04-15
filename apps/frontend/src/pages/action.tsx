import Head from 'next/head'
import publicContentSSR from '@middleware/publicContentSSR'
import publicContent from '@middleware/publicContent'
import { checkActionCode } from 'firebase/auth'
import { auth } from '@config/firebase'
import { authAdmin } from '@config/firebaseadmin'
import VerifyEmail from '@views/Action/VerifyEmail'
import ResetPassword from '@views/Action/ResetPassword'

// http://localhost:3000/action?mode=verifyEmail&oobCode=gzFe5c34xSlEe0iV5lqT-hmLEZZ795r_MdEMvphGYDMAAAGNyzemEg&apiKey=AIzaSyBnnMtfkgB29lCq3mc8flAyIMUWqBwYUHc&continueUrl=http%3A%2F%2Flocalhost%3A3000&lang=en

function Actions({
  mode,
  verified,
  error,
  oobCode,
}: {
  mode: 'verifyEmail' | 'resetPassword'
  verified: boolean
  oobCode: string
  error?: string
}): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      {mode === 'verifyEmail' && <VerifyEmail verified={verified} />}
      {mode === 'resetPassword' && (
        <ResetPassword verified={verified} oobCode={oobCode} />
      )}
    </>
  )
}

export default publicContent(Actions)

export const getServerSideProps = publicContentSSR(async ({ query }) => {
  const { oobCode, mode } = query

  if (mode === 'verifyEmail') {
    if (typeof oobCode !== 'string')
      return {
        props: {
          mode,
          verified: false,
          error: 'invalid-oobCode',
        },
      }

    try {
      const actionCodeData = await checkActionCode(auth, oobCode)

      if (actionCodeData.operation !== 'VERIFY_EMAIL') {
        return {
          props: {
            mode,
            verified: false,
            error: 'invalid-oobCode',
          },
        }
      }

      const user = await authAdmin.getUserByEmail(
        actionCodeData.data.email as string
      )

      if (!user.emailVerified) {
        await authAdmin.updateUser(user.uid, {
          emailVerified: true,
        })
      }

      return {
        props: {
          mode,
          verified: true,
        },
      }
    } catch (error) {
      return {
        props: {
          mode,
          verified: false,
          error: 'invalid-oobCode',
        },
      }
    }
  }

  if (mode === 'resetPassword') {
    if (typeof oobCode !== 'string')
      return {
        props: {
          mode,
          verified: false,
          error: 'invalid-oobCode',
        },
      }

    try {
      const actionCodeData = await checkActionCode(auth, oobCode)

      if (actionCodeData.operation !== 'PASSWORD_RESET') {
        return {
          props: {
            mode,
            verified: false,
            error: 'invalid-oobCode',
          },
        }
      }

      return {
        props: {
          mode,
          oobCode,
          verified: true,
        },
      }
    } catch (error) {
      return {
        props: {
          mode,
          verified: false,
          error: 'invalid-oobCode',
        },
      }
    }
  }

  return { redirect: { destination: '/', permanent: false } }
})
