import { cva } from '@styled-system/css'
import { styled } from '@styled-system/jsx'

const verifiedBadgeStyles = cva({
  base: {},

  variants: {
    type: {
      academy: {
        fill: '#C560D4',
        stroke: '#8D2B9D',
      },
      professor: {
        fill: 'primary.300',
        stroke: 'primary.400',
      },
    },

    size: {
      lg: {
        fontSize: '4xl',
      },
    },
  },

  defaultVariants: {
    type: 'academy',
  },
})

const VerifiedBadgeSvg = ({
  className,
}: {
  className?: string
}): JSX.Element => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M30.6043 2.64675C31.3153 1.78442 32.6847 1.78442 33.3958 2.64675L38.748 9.14C39.193 9.6797 39.9354 9.90978 40.6278 9.7226L48.9591 7.47024C50.0658 7.17112 51.1739 7.93904 51.2174 9.0352L51.5462 17.2892C51.5737 17.9752 52.0323 18.5776 52.7081 18.8144L60.8362 21.6633C61.9156 22.0416 62.339 23.2841 61.6987 24.1955L56.8785 31.0574C56.4779 31.6278 56.4779 32.3723 56.8785 32.9427L61.6987 39.8045C62.339 40.7159 61.9156 41.9583 60.8362 42.3368L52.7081 45.1857C52.0323 45.4225 51.5737 46.0248 51.5462 46.711L51.2174 54.9648C51.1739 56.061 50.0658 56.829 48.9591 56.5298L40.6278 54.2776C39.9354 54.0901 39.193 54.3205 38.748 54.8601L33.3958 61.3533C32.6847 62.2156 31.3153 62.2156 30.6043 61.3533L25.252 54.8601C24.8072 54.3205 24.0647 54.0901 23.3722 54.2776L15.0408 56.5298C13.9343 56.829 12.8262 56.061 12.7826 54.9648L12.4538 46.711C12.4264 46.0248 11.9676 45.4225 11.292 45.1857L3.16377 42.3368C2.08431 41.9583 1.66105 40.7159 2.30123 39.8045L7.12153 32.9427C7.52217 32.3723 7.52217 31.6278 7.12153 31.0574L2.30123 24.1955C1.66105 23.2841 2.08431 22.0416 3.16377 21.6633L11.292 18.8144C11.9676 18.5776 12.4264 17.9752 12.4538 17.2892L12.7826 9.0352C12.8262 7.93904 13.9343 7.17112 15.0408 7.47024L23.3722 9.7226C24.0647 9.90978 24.8072 9.6797 25.252 9.14L30.6043 2.64675Z"
      strokeWidth="4"
    />
    <path
      d="M23.125 32.0042L29.043 37.649L40.8789 26.3594"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const StyledVerifiedBadgeSvg = styled(VerifiedBadgeSvg, verifiedBadgeStyles)

export const VerifiedBadge: typeof StyledVerifiedBadgeSvg = ({
  // eslint-disable-next-line react/prop-types
  type,
  ...props
}) => (
  <div
    title={
      type === 'academy'
        ? 'Academia verificada'
        : type === 'professor'
        ? 'Prefesor verificado'
        : undefined
    }
  >
    <StyledVerifiedBadgeSvg type={type} {...props} />
  </div>
)
