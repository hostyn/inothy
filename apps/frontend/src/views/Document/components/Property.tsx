import { css } from '@styled-system/css'
import { stack } from '@styled-system/patterns'
import Link from 'next/link'
import type { IconType } from 'react-icons'

interface PropertyProps {
  title: string
  icon: IconType
  content: string
  link?: string
}

const Property = ({
  title,
  icon: Icon,
  content,
  link,
}: PropertyProps): JSX.Element => {
  return (
    <section className={css({ display: 'flex', gap: 'sm', py: 'xs' })}>
      <Icon
        size={24}
        className={css({ color: 'grey.500', minWidth: '7xs', height: '4xs' })}
      />
      <div className={stack({ gap: 'xs' })}>
        <span
          className={css({
            fontSize: 'sm',
            fontWeight: '500',
            color: 'grey.400',
          })}
        >
          {title}
        </span>
        {link != null ? (
          <Link
            href={link}
            className={css({
              fontSize: 'md',
              fontWeight: '600',
              color: 'grey.500',
              _hover: {
                textDecoration: 'underline',
              },
            })}
          >
            {content}
          </Link>
        ) : (
          <p
            className={css({
              fontSize: 'md',
              fontWeight: '600',
              color: 'grey.500',
              whiteSpace: 'pre-wrap',
            })}
          >
            {content}
          </p>
        )}
      </div>
    </section>
  )
}

export default Property
