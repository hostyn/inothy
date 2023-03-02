import algoliasearch from 'algoliasearch'
import { ALGOLIA_APP_ID, ALGOLIA_INDEX, ALGOLIA_SEARCH_KEY } from './constants'

const algolia = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY)
const algoliaIndex = algolia.initIndex(ALGOLIA_INDEX)

export default algoliaIndex
