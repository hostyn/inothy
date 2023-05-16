import { applyActionCode, verifyPasswordResetCode } from 'firebase/auth'
import { type GetServerSideProps } from 'next'
import Head from 'next/head'
import { auth } from '@config/firebase'
import VerifyEmail from '@views/VerfiyEmail'
import ResetPassword from '@views/ResetPassword'

interface VerifyEmailPageProps {
  mode: 'verifyEmail' | 'resetPassword'
  verified: boolean
  oobCode: string
  email: string
}

export default function VerifyEmailPage({
  mode,
  verified,
  oobCode,
  email,
}: VerifyEmailPageProps): JSX.Element {
  switch (mode) {
    case 'verifyEmail':
      return (
        <>
          <Head>
            <title>Inothy - Email verificado</title>
            <meta name="robots" content="noindex,nofollow" />
          </Head>
          <VerifyEmail verified={verified} />
        </>
      )

    case 'resetPassword':
      return (
        <>
          <Head>
            <title>Inothy - Cambiar contraseña</title>
          </Head>
          <ResetPassword valid={verified} oobCode={oobCode} email={email} />
        </>
      )
  }
}

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { oobCode, mode },
  } = context

  if (typeof oobCode !== 'string') {
    return { redirect: { permanent: false, destination: '/' } }
  }

  switch (mode) {
    case 'verifyEmail':
      try {
        await applyActionCode(auth, oobCode)
        return { props: { mode, verified: true } }
      } catch (e) {
        return { props: { mode, verified: false } }
      }

    case 'resetPassword':
      try {
        const email = await verifyPasswordResetCode(auth, oobCode)
        return { props: { mode, verified: true, oobCode, email } }
      } catch (e) {
        return { props: { mode, verified: false, oobCode } }
      }
    default:
      return { redirect: { permanent: false, destination: '/' } }
  }
}
