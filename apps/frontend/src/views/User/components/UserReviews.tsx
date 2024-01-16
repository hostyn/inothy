import { trpc } from '@services/trpc'
import InfiniteScroll from 'react-infinite-scroll-component'
import { type UserPageProps } from '../layouts/UserLayout'
import Spinner from '@components/Spinner'
import { css } from '@styled-system/css'
import ReviewCard from './ReviewCard'
import { CiFaceMeh } from 'react-icons/ci'

export default function UserReviews({ username }: UserPageProps): JSX.Element {
  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isLoading: isDocumentLoading,
  } = trpc.user.getReviews.useInfiniteQuery(
    { username },
    {
      getNextPageParam: lastPage => {
        return lastPage.nextCursor
      },
    }
  )

  return (
    <InfiniteScroll
      dataLength={
        reviews?.pages.reduce((acc, page) => acc + page.reviews.length, 0) ?? 0
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
      {isDocumentLoading ? (
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
      ) : reviews?.pages.reduce((acc, page) => acc + page.reviews.length, 0) ===
        0 ? (
        <div
          className={css({
            color: 'grey.500',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: 'xl',
          })}
        >
          <CiFaceMeh size={64} />
          <span
            className={css({
              fontWeight: 'bold',
              fontSize: 'lg',
            })}
          >
            No hay valoraciones
          </span>
          <p>El material de este usuario no ha sido valorado aún.</p>
        </div>
      ) : (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 'md',
          })}
        >
          {reviews?.pages.map(page =>
            page.reviews.map(review => (
              <ReviewCard key={review.id} {...review} />
            ))
          )}
        </div>
      )}
    </InfiniteScroll>
  )
}
