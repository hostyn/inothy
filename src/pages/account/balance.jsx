import Head from 'next/head'
import ProtectedContent from '../../components/ProtectedContent'
import BalanceView from '../../views/Account/Balance'

export default function Balance () {
  return (
    <>
      <Head>
        <title>Inothy - Balance</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ProtectedContent>
        <BalanceView />
      </ProtectedContent>
    </>
  )
}
