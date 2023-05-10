import styled from 'styled-components'

interface FlexProps {
  flexDirection?: string
  margin?: string
  justifyContent?: string
  alignItems?: string
  height?: string
  width?: string
  minWidth?: string
  gap?: string
  padding?: string
  maxWidth?: string
  minHeight?: string
}

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${props => props.flexDirection ?? 'column'};
  margin: ${props => props.margin ?? '0'};
  justify-content: ${props => props.justifyContent ?? 'initial'};
  align-items: ${props => props.alignItems ?? 'initial'};
  height: ${props => props.height ?? 'initial'};
  width: ${props => props.width ?? 'initial'};
  min-width: ${props => props.minWidth ?? 'initial'};
  gap: ${props => props.gap ?? 'initial'};
  padding: ${props => props.padding ?? 'initial'};
  max-width: ${props => props.maxWidth ?? 'initial'};
  min-height: ${props => props.minHeight ?? 'initial'};
`

export default Flex
