import Head from 'next/head'
import publicContentSSR from '@middleware/publicContentSSR'
import publicContent from '@middleware/publicContent'
import { type NextPage } from 'next'
import Home from '@views/Home'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inothy: Prepárate para aprobar</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <Home />
    </>
  )
}

export default publicContent(Page)
export const getServerSideProps = publicContentSSR(async ({ helper }) => {
  await helper.universities.getHomeUniversities.prefetch()

  return {
    props: {},
  }
})
