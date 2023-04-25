import PrivacyView from '@views/Privacy'
import Head from 'next/head'

export default function Privacy(): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - Política de privacidad</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <PrivacyView />
    </>
  )
}
