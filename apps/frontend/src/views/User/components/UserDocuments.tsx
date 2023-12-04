import { trpc } from '@services/trpc'
import { type UserPageProps } from '../layouts/UserLayout'
import DocumentCard from './DocumentCard'
import { css } from '@styled-system/css'

export default function UserDocuments({
  username,
}: UserPageProps): JSX.Element {
  const { data: documentData, fetchNextPage } =
    trpc.user.getDocuments.useInfiniteQuery(
      {
        username,
      },
      {
        getNextPageParam: lastPage => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <div
      className={css({
        display: 'grid',
        // TODO: Adjust grid minmax size
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      })}
    >
      {documentData?.pages.map(page =>
        page.documents.map(document => (
          <DocumentCard key={document.id} {...document} />
        ))
      )}
      <button onClick={async () => await fetchNextPage()}>load more</button>
    </div>
  )
}
