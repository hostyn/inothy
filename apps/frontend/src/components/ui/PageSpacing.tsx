import { css, cx } from '@styled-system/css'
import type React from 'react'

export const pageWidthStyles = css({
  width: '6xl',
  margin: 'auto',
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
