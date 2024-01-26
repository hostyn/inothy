import { css } from '@styled-system/css'

interface UserStatisticCardProps {
  title: string
  value: string
}

export default function UserStatisticCard({
  title,
  value,
}: UserStatisticCardProps): JSX.Element {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <span
        className={css({
          color: 'token(colors.grey.500)',
          fontWeight: 'bold',
          fontSize: 'xl',
          lineHeight: '100%',
        })}
      >
        {value}
      </span>
      <span
        className={css({
          color: 'token(colors.grey.400)',
          fontWeight: '600',
          lineHeight: '100%',
        })}
      >
        {title}
      </span>
    </div>
  )
}
