import Head from 'next/head'
import ProtectedContent from '@components/ProtectedContent'
import DownloadsView from '@views/Account/Downloads'

export default function Downloads(): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - Descargas</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ProtectedContent>
        <DownloadsView />
      </ProtectedContent>
    </>
  )
}
