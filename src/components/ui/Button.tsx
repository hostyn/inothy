import styled from 'styled-components'
import { colors, sizes } from '@config/theme'
import LoadingRing from '@components/LoadingRing'

interface StyledButtonProps {
  fontFamily?: string
  fontSize?: string
  color?: keyof typeof colors
  background?: keyof typeof colors
  margin?: string
  padding?: string
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  gridColumn?: string
}

const StyledButton = styled.button<StyledButtonProps>`
  font-family: ${props => props.fontFamily ?? 'VarelaRound'};
  font-size: ${props => props.fontSize ?? sizes.buttonText};
  background: ${props => colors[props.background ?? 'secondary']};
  color: ${props => colors[props.color ?? 'white'] ?? 'white'};
  border-radius: ${props => props.borderRadius ?? '999999px'};
  border: ${props => props.border ?? 'none'};
  height: ${props => props.height ?? 'auto'};
  width: ${props => props.width ?? 'initial'};
  margin: ${props => props.margin ?? '0 1em'};
  padding: ${props => props.padding ?? '0.5rem 2rem'};
  grid-column: ${props => props.gridColumn ?? 'initial'};
  cursor: pointer;
  transition: 0.2s;

  :hover:enabled {
    scale: 1.05;
  }

  :disabled {
    background-color: ${colors.disabledButton};
  }
`

interface ButtonProps extends StyledButtonProps {
  children?: any
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => any
}

function Button({
  children,
  loading,
  color,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <StyledButton {...props} color={color}>
      {loading == null ? (
        children
      ) : loading ? (
        <LoadingRing color={color ?? 'white'} />
      ) : (
        children
      )}
    </StyledButton>
  )
}

export default Button
