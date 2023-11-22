import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'

interface UserCardInfoProps {
  userId: string
}

const UserCardInfo = ({ userId }: UserCardInfoProps): JSX.Element => {
  const { data: userData } = trpc.user.getUser.useQuery({
    id: userId,
  })

  const { data: userReviewsData } = trpc.reviews.getUserReviews.useQuery({
    userId,
  })

  const averageRating =
    userReviewsData != null &&
    (
      userReviewsData
        ?.map(userReview => userReview.rating)
        .reduce((tot, val) => tot + val, 0) / userReviewsData?.length
    ).toFixed(1)

  return (
    <section
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'strech',
        minWidth: '100%',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <p
          className={css({
            fontSize: 'xl',
            lineHeight: '100%',
            fontWeight: '700',
            color: 'token(colors.text)',
          })}
        >
          {userData?.documents.length ?? ''}
        </p>
        <p
          className={css({
            color: 'token(colors.grey.400)',
            fontSize: 'md',
            fontWeight: '600',
            lineHeight: '100%',
            letterSpacing: '-0.64px',
          })}
        >
          Documentos
        </p>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
        })}
      >
        <p
          className={css({
            fontSize: 'xl',
            lineHeight: '100%',
            fontWeight: '700',
            color: 'token(colors.text)',
          })}
        >
          {averageRating}
        </p>
        <p
          className={css({
            color: 'token(colors.grey.400)',
            fontSize: 'md',
            fontWeight: '600',
            lineHeight: '100%',
            letterSpacing: '-0.64px',
          })}
        >
          V. Media
        </p>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
        })}
      >
        <p
          className={css({
            fontSize: 'xl',
            lineHeight: '100%',
            fontWeight: '700',
            color: 'token(colors.text)',
          })}
        >
          {userData?.reviews.length ?? ''}
        </p>
        <p
          className={css({
            color: 'token(colors.grey.400)',
            fontSize: 'md',
            fontWeight: '600',
            lineHeight: '100%',
            letterSpacing: '-0.64px',
          })}
        >
          Valoraciones
        </p>
      </div>
    </section>
  )
}
export default UserCardInfo
