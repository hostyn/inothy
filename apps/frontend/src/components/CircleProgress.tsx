import { css } from '@styled-system/css'

interface CircleProgressProps {
  progress: number
}

export default function CircleProgress({
  progress,
}: CircleProgressProps): JSX.Element {
  return (
    <svg
      className={css({
        height: '1.5em',
        verticalAlign: 'middle',
        transformOrigin: 'center',
        transform: 'rotate(-90deg)',
      })}
      viewBox="85 85 230 230"
      strokeWidth="30"
      stroke="white"
    >
      <circle
        style={
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          {
            '--progress': progress.toPrecision(2),
          } as React.CSSProperties
        }
        className={css({
          fill: 'none',
          transition: 'all 50ms ease',
          strokeDasharray: `calc(2 * 3.14 * 100 * var(--progress)), 9999`,
          strokeDashoffset: '0',
          strokeLinecap: 'round',
        })}
        cx="200"
        cy="200"
        r="100"
      />
    </svg>
  )
}
