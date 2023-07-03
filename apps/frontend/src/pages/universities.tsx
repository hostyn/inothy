import Head from 'next/head'
import publicContentSSR from '@middleware/publicContentSSR'
import publicContent from '@middleware/publicContent'
import UniversitiesView from '@views/Universities'

function Universities(): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - Universidades</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <UniversitiesView />
    </>
  )
}

export default publicContent(Universities)

export const getServerSideProps = publicContentSSR(async ({ helper }) => {
  await helper.universities.getUniversities.prefetch()
  return { props: {} }
})
