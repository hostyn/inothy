import { trpc } from '@services/trpc'
import InfiniteScroll from 'react-infinite-scroll-component'
import { type UserPageProps } from '../layouts/UserLayout'
import Spinner from '@components/Spinner'
import { css } from '@styled-system/css'
import ReviewCard from './ReviewCard'

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
