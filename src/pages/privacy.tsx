import Head from 'next/head'
import PrivacyView from '@views/PrivaciyView'

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
