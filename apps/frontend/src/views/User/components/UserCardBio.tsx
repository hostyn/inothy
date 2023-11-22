import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { MdOutlineVerified } from 'react-icons/md'

interface UserCardBioProps {
  userId: string
}

const UserCardBio = ({ userId }: UserCardBioProps): JSX.Element => {
  const { data: userData } = trpc.user.getUser.useQuery({
    id: userId,
  })

  return (
    <section
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'start',
        justifyContent: 'center',
        alignSelf: 'stretch',
        gap: 'md',
        lineHeight: '100%',
      })}
    >
      <div
        className={css({ display: 'flex', alignItems: 'center', gap: 'sm' })}
      >
        <h2
          className={css({
            color: 'token(colors.text)',
            fontSize: 'xl',
            fontWeight: '800',
            letterSpacing: '-0.72px', // TODO: Meter en panda.config?
          })}
        >
          @{userData?.username ?? ''}
        </h2>
        <MdOutlineVerified
          size={24}
          className={css({
            color: 'token(colors.primary.300)',
          })}
        />
      </div>
      <p
        className={css({
          color: 'token(colors.grey.500)',
          fontWeight: '400',
          fontSize: 'md',
        })}
      >
        {userData?.biography ?? ''}
      </p>
    </section>
  )
}
export default UserCardBio
