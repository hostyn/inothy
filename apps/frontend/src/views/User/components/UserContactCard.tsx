import { css } from '@styled-system/css'
import { type IconType } from 'react-icons'

interface UserContactCardProps {
  Icon: IconType
  href?: string
  text: string
}

export default function UserContactCard({
  Icon,
  href,
  text,
}: UserContactCardProps): JSX.Element {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 'sm',
        color: 'token(colors.grey.600)',
      })}
    >
      <Icon size={18} />
      {href != null ? (
        <a
          className={css({
            _hover: {
              textDecoration: 'underline',
            },
          })}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
    </div>
  )
}
