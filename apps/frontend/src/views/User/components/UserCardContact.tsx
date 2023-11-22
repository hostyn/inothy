import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import {
  MdOutlineLink,
  MdOutlineMap,
  MdOutlineLocalPhone,
  MdOutlineMail,
} from 'react-icons/md'

interface UserCardContactProps {
  userId: string
}

const UserCardContact = ({ userId }: UserCardContactProps): JSX.Element => {
  const { data: userData } = trpc.user.getUser.useQuery({
    id: userId,
  })

  return (
    <section
      className={css({
        display: 'flex',
        flexDir: 'column',
        gap: 'sm',
        color: 'token(colors.grey.600)',
        lineHeight: '100%',
        width: '100%',
        fontWeight: '500',
      })}
    >
      <div
        className={css({
          display: 'flex',
          gap: 'sm',
          alignItems: 'center',
        })}
      >
        <MdOutlineLocalPhone size={18} />
        <p>{userData?.phone ?? ''}</p>
      </div>
      <div
        className={css({
          display: 'flex',
          gap: 'sm',
          alignItems: 'center',
        })}
      >
        <MdOutlineMail
          size={18}
          className={css({ color: 'token(colors.text)' })}
        />
        <p className={css({ color: 'token(colors.grey.600)' })}>
          {userData?.email ?? ''}
        </p>
      </div>
      <div
        className={css({
          display: 'flex',
          gap: 'sm',
          alignItems: 'center',
        })}
      >
        <MdOutlineMap
          size={18}
          className={css({ color: 'token(colors.text)' })}
        />
        <p className={css({ color: 'token(colors.grey.600)' })}>
          {/* TODO: Esto como lo mostramos? SERÍA EL PÚBLICO */}
          {`${userData?.publicAddress ?? ''}`}
        </p>
      </div>
      <div
        className={css({
          display: 'flex',
          gap: 'sm',
          alignItems: 'center',
        })}
      >
        <MdOutlineLink
          size={18}
          className={css({ color: 'token(colors.text)' })}
        />
        <p className={css({ color: 'token(colors.grey.600)' })}>
          {userData?.website ?? ''}
        </p>
      </div>
    </section>
  )
}
export default UserCardContact
