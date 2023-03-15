import Head from 'next/head'
import ProtectedContent from '@components/ProtectedContent'
import UploadsView from '@views/Account/Uploads'

export default function Uploads(): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - Subido</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ProtectedContent>
        <UploadsView />
      </ProtectedContent>
    </>
  )
}
