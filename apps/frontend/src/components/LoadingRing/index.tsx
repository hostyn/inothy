import { colors } from '@config/theme'
import styled from 'styled-components'

const Svg = styled.svg<{ color: string }>`
  --uib-size: 1em;
  --uib-speed: 2s;
  --uib-color: ${props => props.color ?? colors.primary};

  height: var(--uib-size);
  width: var(--uib-size);
  vertical-align: middle;
  transform-origin: center;
  animation: rotate var(--uib-speed) linear infinite;

  & circle {
    fill: none;
    stroke: var(--uib-color);
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: stretch calc(var(--uib-speed) * 0.75) ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes stretch {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dashoffset: -124px;
    }
  }
`

export default function LoadingRing({
  color,
  className,
}: {
  color?: keyof typeof colors
  className?: string
}): JSX.Element {
  return (
    <Svg
      className={className}
      viewBox="25 25 50 50"
      strokeWidth="5"
      color={colors[color ?? 'primary']}
    >
      <circle cx="50" cy="50" r="20" />
    </Svg>
  )
}
