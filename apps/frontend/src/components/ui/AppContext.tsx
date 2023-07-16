import { css, cx } from '@styled-system/css'
import type React from 'react'

export const appContextStyles = css({
  width: '5xl',
  margin: 'auto',
  minHeight: 'inherit',
})

interface Props {
  children: React.ReactNode
  className?: string
}

export const AppContext = ({ className, children }: Props): JSX.Element => {
  return <div className={cx(appContextStyles, className)}>{children}</div>
}
