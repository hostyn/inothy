import styled from 'styled-components'
import { colors } from '../config/theme'

const Span = styled.span`
  color: ${(props) => colors[props.color] || 'inherit'};
  font-size: ${(props) => props.fontSize || 'inherit'};
  font-weight: ${(props) => props.fontWeight || 'inherit'};
  margin: ${(props) => props.margin || '0'};
  text-decoration: ${(props) => props.textDecoration || 'none'};
`

export default Span
