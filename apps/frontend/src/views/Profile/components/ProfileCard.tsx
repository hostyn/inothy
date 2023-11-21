import Image from 'next/image'
import { css } from '@styled-system/css'
import { Separator } from '@ui/Separator'

import ButtonGroup from './ButtonGroup'
import ProfileInfo from './ProfileInfo'
import ProfileBio from './ProfileBio'
import { trpc } from '@services/trpc'

interface ProfileCardProps {
  profileId: string
}

const ProfileCard = ({ profileId }: ProfileCardProps): JSX.Element => {
  const { data: profileData } = trpc.profile.getProfile.useQuery({
    id: profileId,
  })

  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'xl',
        padding: 'xl',
        backgroundColor: 'token(colors.grey.100)',
        height: 'fit-content',
        minWidth: '350px', // TODO: Cambiar valor a capón
        borderRadius: '15px', // TODO: Cambiar valor a capón
      })}
    >
      <section
        className={css({
          position: 'relative',
          height: 'md',
          width: 'md',
        })}
      >
        <Image
          alt={profileData?.username ?? ''}
          src={profileData?.avatarUrl ?? '/img.jpg'}
          fill
          objectFit="cover"
          className={css({ borderRadius: '15px' })} // TODO: Cambiar valor a capón
        />
      </section>
      <ProfileInfo profileId={profileId} />

      <ProfileBio profileId={profileId} />

      <Separator
        className={css({
          border: '1px solid token(colors.grey.200)',
          color: 'token(colors.red.500)',
        })}
      />

      <ButtonGroup />
    </article>
  )
}
export default ProfileCard
