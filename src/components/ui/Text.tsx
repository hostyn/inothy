import { colors } from '../../config/theme'
import styled from 'styled-components'

interface IText {
  fontFamily?: string
  fontSize?: string
  color?: keyof typeof colors
  margin?: string
  width?: string
  display?: string
  alignItems?: string
  fontWeight?: string
  textAlign?: string
  userSelect?: string
  minWidth?: string
  lineHeight?: string
  maxWidth?: string
  cursor?: string
  lineBreak?: string
}

const Text = styled.p<IText>`
  display: ${props => props.display ?? 'initial'};
  align-items: ${props => props.alignItems ?? 'inital'};
  font-family: ${props => props.fontFamily ?? 'VarelaRound'};
  font-size: ${props => props.fontSize ?? '1rem'};
  font-weight: ${props => props.fontWeight ?? 'normal'};
  color: ${props => colors[props.color ?? 'primary']};
  text-align: ${props => props.textAlign ?? 'left'};
  margin: ${props => props.margin ?? '0'};
  user-select: ${props => props.userSelect ?? 'initial'};
  width: ${props => props.width ?? 'initial'};
  min-width: ${props => props.minWidth ?? 'initial'};
  line-height: ${props => props.lineHeight ?? 'initial'};
  max-width: ${props => props.maxWidth ?? 'initial'};
  cursor: ${props => props.cursor ?? 'inherit'};
  line-break: ${props => props.lineBreak ?? 'auto'};
`

export default Text
