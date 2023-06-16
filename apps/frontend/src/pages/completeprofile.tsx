import CompleteProfileView from '@views/CompleteProfile'
import Head from 'next/head'

export default function CompleteProfile(): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy: Completa tu perfil</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <CompleteProfileView />
    </>
  )
}
