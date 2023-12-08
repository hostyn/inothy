import { trpc } from '@services/trpc'
import { type UserPageProps } from '../layouts/UserLayout'
import DocumentCard from './DocumentCard'
import { css } from '@styled-system/css'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '@components/Spinner'

export default function UserDocuments({
  username,
}: UserPageProps): JSX.Element {
  const {
    data: documentData,
    fetchNextPage,
    hasNextPage,
  } = trpc.user.getDocuments.useInfiniteQuery(
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
    <InfiniteScroll
      dataLength={
        documentData?.pages.reduce(
          (acc, page) => acc + page.documents.length,
          0
        ) ?? 0
      }
      next={fetchNextPage}
      hasMore={hasNextPage ?? false}
      loader={
        <div
          className={css({
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'md',
          })}
        >
          <Spinner
            className={css({
              fontSize: 'lg',
              stroke: 'grey.500',
            })}
          />
        </div>
      }
      hasChildren
    >
      <div
        className={css({
          display: 'grid',
          // TODO: Adjust grid minmax size
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 'md',
        })}
      >
        {documentData?.pages.map(page =>
          page.documents.map(document => (
            <DocumentCard key={document.id} {...document} />
          ))
        )}
      </div>
    </InfiniteScroll>
  )
}
