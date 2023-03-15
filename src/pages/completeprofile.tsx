import Head from 'next/head'
import CompleteProfileView from '@views/CompleteProfile/CompleteProfile'

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
