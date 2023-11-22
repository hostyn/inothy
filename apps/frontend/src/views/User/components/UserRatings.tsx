import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { Separator } from '@ui/Separator'
import { MdOutlineStar } from 'react-icons/md'
import UserReviewCard from './UserReviewCard'

interface UserRatingsProps {
  userId: string
}

const UserRatings = ({ userId }: UserRatingsProps): JSX.Element => {
  const { data: userReviewsData } = trpc.reviews.getUserReviews.useQuery({
    userId,
  })
  console.log(userReviewsData)
  const averageRating =
    userReviewsData != null &&
    (
      userReviewsData
        ?.map(userReview => userReview.rating)
        .reduce((tot, val) => tot + val, 0) / userReviewsData?.length
    ).toFixed(1)

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'md',
        width: '100%',
      })}
    >
      <Separator />
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'strech',
          width: '100%',
          color: 'token(colors.grey.500)',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'end',
            gap: 'sm',
          })}
        >
          <p
            className={css({
              fontSize: '5xl',
              fontWeight: '700',
              alignSelf: 'start',
              lineHeight: '100%',
            })}
          >
            {averageRating}
          </p>
          <span
            className={css({
              fontSize: 'sm',
              fontWeight: '500',
              lineHeight: '250%',
            })}
          >
            ({userReviewsData?.length})
          </span>
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 'md',
            fontWeight: '500',
          })}
        >
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: 'lg',
              fontWeight: '500',
            })}
          >
            <p>Valoraciones de Inothy(23)</p>
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                color: '#EA8C00',
              })}
            >
              <span className={css({ fontSize: 'sm', fontWeight: '800' })}>
                4.3
              </span>
              <MdOutlineStar size={20} />
            </div>
          </div>
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: 'lg',
            })}
          >
            <p>Valoraciones de Usuario(5)</p>
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                color: '#EA8C00',
              })}
            >
              <span className={css({ fontSize: 'sm', fontWeight: '800' })}>
                4.3
              </span>
              <MdOutlineStar size={20} />
            </div>
          </div>
        </div>
        <div className={css({ fontSize: 'xs', textDecoration: 'underline' })}>
          Como funcionan las valoraciones
        </div>
      </div>
      <Separator />
      <div className={css({ fontWeight: '700', alignSelf: 'start' })}>
        3 Valoraciones
      </div>
      <div
        className={css({
          w: '100%',
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'md',
          alignSelf: 'stretch',
        })}
      >
        {userReviewsData?.map(userReview => (
          <UserReviewCard key={userReview.id} userId={userId} />
        ))}
      </div>
    </div>
  )
}
export default UserRatings
