import Head from 'next/head'
import LegalView from '../views/LegalView'

export default function Legal () {
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
