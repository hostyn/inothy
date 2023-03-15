import Head from 'next/head'
import ProtectedContent from '@components/ProtectedContent'
import KYCView from '@views/KYC/KYCView'

export default function KYC(): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - KYC</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ProtectedContent>
        <KYCView />
      </ProtectedContent>
    </>
  )
}
