import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { MdOutlineVerified } from 'react-icons/md'

interface ProfileStatsProps {
  profileId: string
}

const ProfileBio = ({ profileId }: ProfileStatsProps): JSX.Element => {
  const { data: profileData } = trpc.profile.getProfile.useQuery({
    id: profileId,
  })

  return (
    <section
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'md',
        width: '100%',
      })}
    >
      <div
        className={css({ display: 'flex', alignItems: 'center', gap: 'sm' })}
      >
        <h3
          className={css({
            color: 'token(colors.h3rimary.500)',
            fontSize: 'xl',
            fontWeight: '800',
            lineHeight: 'xl',
          })}
        >
          {profileData?.username}
        </h3>
        <span>
          <MdOutlineVerified
            size={24}
            className={css({
              borderRadius: '50%',
              color: 'token(colors.primary.400)',
            })}
          />
        </span>
      </div>
      {/* TODO: Cambiar valor a capón */}
      <p>{profileData?.biography}</p>
    </section>
  )
}
export default ProfileBio
