import styled from 'styled-components'

interface FlexDivProps {
  flexDirection?: string
  margin?: string
  justifyContent?: string
  alignItems?: string
  height?: string
  width?: string
  overflow?: string
}

interface FlexProps extends FlexDivProps {
  children: JSX.Element | JSX.Element[]
}

const FlexDiv = styled.div<FlexDivProps>`
  display: flex;
  flex-direction: ${props => props.flexDirection ?? 'column'};
  margin: ${props => props.margin ?? '0'};
  justify-content: ${props => props.justifyContent ?? 'initial'};
  align-items: ${props => props.alignItems ?? 'initial'};
  height: ${props => props.height ?? 'initial'};
  width: ${props => props.width ?? 'initial'};
  overflow: ${props => props.overflow ?? 'initial'};
`

export default function Flex({ children, ...props }: FlexProps): JSX.Element {
  return <FlexDiv {...props}>{children}</FlexDiv>
}
