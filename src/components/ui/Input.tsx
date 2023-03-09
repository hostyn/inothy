import styled from 'styled-components'
import { colors } from '@config/theme'

interface InputProps {
  fontFamily?: string
  fontSize?: string
  textAlign?: string
  color?: string
  padding?: string
  margin?: string
  border?: string
  borderRadius?: string
  width?: string
}

const Input = styled.input<InputProps>`
  font-family: ${props => props.fontFamily ?? 'VarelaRound'};
  font-size: ${props => props.fontSize ?? '1rem'};
  text-align: ${props => props.textAlign ?? 'left'};
  color: ${props => props.color ?? 'initial'};
  padding: ${props => props.padding ?? '10px'};
  margin: ${props => props.margin ?? '0'};
  border: ${props => props.border ?? `2px solid ${colors.primary}`};
  border-radius: ${props => props.borderRadius ?? '10px'};
  width: ${props => props.width ?? '100%'};
  max-width: 100%;
  outline: none;

  &:disabled {
    opacity: 1;
    color: ${colors.disabledColor};
    background-color: ${colors.disabledBackground};
  }
`

export default Input
