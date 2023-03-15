import Head from 'next/head'
import CookiesView from '@views/CookiesView'

export default function Cookies(): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - Cookies</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <CookiesView />
    </>
  )
}
