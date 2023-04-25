import LegalView from '@views/Legal'
import Head from 'next/head'

export default function Legal(): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - Terminos y condiciones</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <LegalView />
    </>
  )
}
