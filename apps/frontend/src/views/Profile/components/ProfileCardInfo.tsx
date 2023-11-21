import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'

interface ProfileInfoProps {
  profileId: string
}

const ProfileInfo = ({ profileId }: ProfileInfoProps): JSX.Element => {
  const { data: profileData } = trpc.profile.getProfile.useQuery({
    id: profileId,
  })

  // TODO: Esto no me gusta, hay que cambiarlo
  if (profileData == null) return <div>Null</div>

  // TODO: Esto se hará con un endpoint específico
  const ratings = profileData?.reviews.map(review => review.rating)
  const addedRatings = ratings?.reduce((acc, curr) => acc + curr, 0)
  const averageRating = addedRatings / ratings.length

  return (
    <section
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '100%',
      })}
    >
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
            lineHeight: 'xl',
            fontWeight: '700',
            color: 'token(colors.grey.500)',
          })}
        >
          {profileData?.documents.length}
        </p>
        <p
          className={css({
            color: 'token(colors.grey.400)',
            fontSize: 'md',
            fontWeight: '600',
            lineHeight: 'md',
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
            lineHeight: 'xl',
            fontWeight: '700',
            color: 'token(colors.grey.500)',
          })}
        >
          {averageRating.toFixed(1)}
        </p>
        <p
          className={css({
            color: 'token(colors.grey.400)',
            fontSize: 'md',
            fontWeight: '600',
            lineHeight: 'md',
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
            lineHeight: 'xl',
            fontWeight: '700',
            color: 'token(colors.grey.500)',
          })}
        >
          {profileData?.reviews.length}
        </p>
        <p
          className={css({
            color: 'token(colors.grey.400)',
            fontSize: 'md',
            fontWeight: '600',
            lineHeight: 'md',
          })}
        >
          Valoraciones
        </p>
      </div>
    </section>
  )
}
export default ProfileInfo
