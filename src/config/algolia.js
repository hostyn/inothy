import algoliasearch from 'algoliasearch'

const algolia = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY)
const algoliaIndex = algolia.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX)

export default algoliaIndex
