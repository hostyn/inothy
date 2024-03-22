import protectedContent from '@middleware/protectedContent'
import protectedContentSSR from '@middleware/protectedContentSSR'
import KYC from '@views/KYC'
import Head from 'next/head'

function Page(): JSX.Element {
  return (
    <>
      <Head>
        <title>KYC - Inothy</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <KYC />
    </>
  )
}

export default protectedContent(Page)

export const getServerSideProps = protectedContentSSR(async ({ helper }) => {
  await Promise.all([
    helper.auth.getKYCStatus.prefetch(),
    helper.auth.getUserFullData.prefetch(),
  ])
  return { props: {} }
})
