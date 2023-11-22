import Image from 'next/image'
import { css } from '@styled-system/css'
import { Separator } from '@ui/Separator'

import UserCardContact from './UserCardContact'
import UserCardInfo from './UserCardInfo'
import UserCardBio from './UserCardBio'
import { trpc } from '@services/trpc'

interface UserCardProps {
  userId: string
}

const UserCard = ({ userId }: UserCardProps): JSX.Element => {
  const { data: userData } = trpc.user.getUser.useQuery({
    id: userId,
  })

  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'xl',
        padding: 'xl',
        backgroundColor: 'token(colors.primary.100)',
        height: 'fit-content',
        w: '2xl',
        borderRadius: 'lg',
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
          alt={userData?.username ?? 'Avatar del Usuario'}
          src={userData?.avatarUrl ?? ''}
          fill
          objectFit="cover"
          className={css({ borderRadius: 'md' })}
        />
      </section>
      <UserCardInfo userId={userId} />

      <UserCardBio userId={userId} />

      <Separator
        size="sm"
        className={css({ border: '1px solid token(colors.grey.200)' })}
      />

      <UserCardContact userId={userId} />
    </article>
  )
}
export default UserCard
