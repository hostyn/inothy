import Image from 'next/image'
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { Separator } from '@ui/Separator'

import ButtonGroup from './ButtonGroup'
import ProfileStats from './ProfileInfo'
import ProfileBio from './ProfileBio'

interface ProfileCardProps {
  profileId: string
}

const ProfileCard = ({ profileId }: ProfileCardProps): JSX.Element => {
  const { data: profileData } = trpc.profile.getProfile.useQuery({
    id: profileId,
  })
  console.log('profileData', profileData)
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
      <ProfileStats />

      <ProfileBio />

      <Separator
        className={css({
          border: '1px solid token(colors.grey.200)',
          color: 'token(colors.red.500)',
        })}
      />
      {/* BOTONES */}
      <ButtonGroup />
    </article>
  )
}
export default ProfileCard
