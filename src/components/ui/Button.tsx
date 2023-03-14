import styled from 'styled-components'
import { colors, sizes } from '@config/theme'

interface ButtonProps {
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

const Button = styled.button<ButtonProps>`
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

export default Button
