import Head from 'next/head'
import algoliaIndex from '@config/algolia'
import { type GetServerSideProps } from 'next'
import SearchView from '@views/Search'
import type { Record, SearchResults } from 'types/algolia'

interface SearchProps {
  q: SearchResults
}

export default function Search({ q }: SearchProps): JSX.Element {
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

export const getServerSideProps: GetServerSideProps = async context => {
  const { q, page } = context.query

  if (typeof q !== 'string') return { props: {} }

  const parsedPage = typeof page === 'string' ? parseInt(page) : 0

  const searchResult = await algoliaIndex.search<Record>(q, {
    page: parsedPage,
  })

  return { props: { q: searchResult } }
}
