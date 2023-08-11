import { cx } from '@styled-system/css'
import spinerClass from './Spinner.module.css'

export default function Spinner({
  className,
}: {
  className?: string
}): JSX.Element {
  return (
    <svg
      className={cx(spinerClass.spinner, className)}
      viewBox="25 25 50 50"
      strokeWidth="5"
      stroke="white"
    >
      <circle cx="50" cy="50" r="20" />
    </svg>
  )
}
