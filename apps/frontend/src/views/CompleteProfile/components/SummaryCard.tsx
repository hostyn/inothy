import { colors } from '@config/theme'
import { Text } from '@ui'
import styled from 'styled-components'

const SummaryCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 2px solid ${colors.primary};
  padding: 1rem;
  background-color: ${colors.white};
  cursor: pointer;
`

const StyledText = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`

interface SummaryCardPrps {
  title: string
  elements: string[]
  onClick: () => unknown
}

export default function SummaryCard({
  title,
  elements,
  onClick,
}: SummaryCardPrps): JSX.Element {
  return (
    <SummaryCardDiv onClick={onClick}>
      <StyledText cursor="inherit" color="secondary">
        {title}
      </StyledText>
      {elements.map((element, index) => (
        <StyledText key={index}>{element}</StyledText>
      ))}
    </SummaryCardDiv>
  )
}
