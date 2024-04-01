import Image from 'next/image'
import { css } from '@styled-system/css'
import { Separator } from '@ui/Separator'
import { trpc } from '@services/trpc'
import { type UserPageProps } from '../layouts/UserLayout'
import UserStatisticCard from './UserStatisticCard'
import UserContactCard from './UserContactCard'
import {
  MdInsertLink,
  MdOutlineMail,
  MdOutlineMap,
  MdOutlinePhoneEnabled,
} from 'react-icons/md'
import { VerifiedBadge } from '@components/VerfifiedBadge'

export default function UserInfo({ username }: UserPageProps): JSX.Element {
  const { data: userData } = trpc.user.getUser.useQuery({
    username,
  })

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'xl',
        padding: 'xl',
        backgroundColor: 'token(colors.primary.100)',
        height: 'fit-content',
        w: '100%',
        borderRadius: 'lg',
      })}
    >
      <Image
        alt={userData?.username ?? 'Avatar del Usuario'}
        height={128}
        width={128}
        src={userData?.avatarUrl ?? '/static/images/default_avatar.png'}
        className={css({ borderRadius: 'md' })}
      />

      <div
        className={css({
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        })}
      >
        <UserStatisticCard
          title="Documentos"
          value={userData?.documentCount.toString() ?? '-'}
        />
        <UserStatisticCard
          title="V. Media"
          value={userData?.reviewsAvg?.toString() ?? '-'}
        />
        <UserStatisticCard
          title="Valoraciones"
          value={userData?.reviewsCount.toString() ?? '-'}
        />
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 'md',
        })}
      >
        <span
          title={userData?.username}
          className={css({
            display: 'flex',
            gap: 'sm',
            fontSize: 'xl',
            fontWeight: 'bolder',
            lineHeight: '100%',
            letterSpacing: '-0.02em',
            color: 'text',
          })}
        >
          {userData?.username}
          {(userData?.isAcademy ?? false) && <VerifiedBadge type="academy" />}
          {(userData?.isProfessor ?? false) && (
            <VerifiedBadge type="professor" />
          )}
        </span>

        <p
          className={css({
            whiteSpace: 'pre-wrap',
            lineHeight: '110%',
            color: 'grey.500',
          })}
        >
          {userData?.biography}
        </p>
      </div>

      <Separator visual="dark" />

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 'sm',
          justifyContent: 'space-between',
        })}
      >
        {userData?.phone != null && (
          <UserContactCard
            Icon={MdOutlinePhoneEnabled}
            text={userData?.phone}
          />
        )}

        {userData?.publicEmail != null && (
          <UserContactCard Icon={MdOutlineMail} text={userData?.publicEmail} />
        )}

        {userData?.publicAddress != null && (
          <UserContactCard Icon={MdOutlineMap} text={userData?.publicAddress} />
        )}

        {userData?.website != null && (
          <UserContactCard
            Icon={MdInsertLink}
            text={userData?.website}
            href={userData?.website}
          />
        )}
      </div>
    </div>
  )
}
