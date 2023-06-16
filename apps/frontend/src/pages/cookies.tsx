import CookiesView from '@views/Cookies'
import Head from 'next/head'

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
