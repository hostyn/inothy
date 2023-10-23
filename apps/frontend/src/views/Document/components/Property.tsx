import { css } from '@styled-system/css'
import { hstack } from '@styled-system/patterns'
import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'

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
  link = '',
}: PropertyProps): JSX.Element => {
  return (
    <section className={hstack({ gap: 'sm' })}>
      <Icon size={24} className={css({ color: 'grey.500', minWidth: '7xs' })} />
      <div>
        <span
          className={css({
            fontSize: 'sm',
            fontWeight: '500',
            color: 'grey.400',
          })}
        >
          {title}
        </span>
        <p
          className={css({
            fontSize: 'md',
            fontWeight: '700',
            color: 'grey.500',
          })}
        >
          {link != null ? (
            <Link href={link} title={title}>
              {content}
            </Link>
          ) : (
            content
          )}
        </p>
      </div>
    </section>
  )
}

export default Property
