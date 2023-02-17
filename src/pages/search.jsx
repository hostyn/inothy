import Head from 'next/head'
import algoliaIndex from '../config/algolia'
import SearchView from '../views/Search'

export default function Search ({ q }) {
  return (
    <>
      <Head>
        <title>Inothy - Buscar</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <SearchView q={q} />
    </>
  )
}

export async function getServerSideProps (context) {
  const { q, page } = context.query

  if (!q) return { props: {} }

  const res = await algoliaIndex.search(q, { page: page || 0 })

  return { props: { q: res } }
}
