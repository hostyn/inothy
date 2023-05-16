import styled from 'styled-components'
import { colors } from '@config/theme'

interface SpanProps {
  color?: keyof typeof colors
  fontSize?: string
  fontWeight?: string
  margin?: string
  textDecoration?: string
}

const Span = styled.span<SpanProps>`
  color: ${props => (props.color != null ? colors[props.color] : 'inherit')};
  font-size: ${props => props.fontSize ?? 'inherit'};
  font-weight: ${props => props.fontWeight ?? 'inherit'};
  margin: ${props => props.margin ?? '0'};
  text-decoration: ${props => props.textDecoration ?? 'none'};
`

export default Span
