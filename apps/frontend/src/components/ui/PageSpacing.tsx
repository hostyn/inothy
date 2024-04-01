import { css, cx } from '@styled-system/css'
import type React from 'react'

export const pageWidthStyles = css({
  margin: '0 1.5rem',

  md: {
    margin: '0 2rem',
  },

  xl: {
    width: '6xl',
    margin: 'auto',
  },

  '2xl': {
    width: '7xl',
  },
})

export const pageSpacingStyles = cx(
  pageWidthStyles,
  css({
    minHeight: 'inherit',
  })
)

interface Props {
  children: React.ReactNode
  className?: string
}

export const PageSpacing = ({ className, children }: Props): JSX.Element => {
  return <div className={cx(pageSpacingStyles, className)}>{children}</div>
}
