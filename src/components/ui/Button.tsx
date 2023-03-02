import styled from 'styled-components'
import { colors, sizes } from '../../config/theme'

interface IButton {
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

const Button = styled.button<IButton>`
  font-family: ${props => props.fontFamily ?? 'VarelaRound'};
  font-size: ${props => props.fontSize ?? sizes.buttonText};
  background: ${props => colors[props.background ?? 'primary']};
  color: ${props => colors[props.color ?? 'white'] ?? 'white'};
  border-radius: ${props => props.borderRadius ?? '999999px'};
  border: ${props => props.border ?? 'none'};
  height: ${props => props.height ?? '100%'};
  width: ${props => props.width ?? 'initial'};
  margin: ${props => props.margin ?? '0 1em'};
  padding: ${props => props.padding ?? '0'};
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
