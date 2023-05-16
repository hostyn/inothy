import { colors } from '@config/theme'
import { Img, Span, Text } from '@ui'
import styled from 'styled-components'

const CardCardDiv = styled.div<{ selected: boolean }>`
  display: grid;
  min-width: 100%;
  grid-template-columns: 3rem 1fr 1.5rem;
  gap: 1rem;
  border-radius: 10px;
  border: ${props =>
    props.selected
      ? `2px solid ${colors.secondary}`
      : `2px solid ${colors.primary}`};
  padding: 1rem;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;

  @media (max-width: 500px) {
    grid-template-columns: 2rem 1fr 1rem;
    gap: 0.5rem;
    padding: 1rem 0.7rem;
  }

  ${props =>
    props.selected &&
    `
    scale: 1.02;
  `}

  :hover {
    scale: 1.02;
  }
`

const AddCardText = styled(Text)`
  grid-column: 2/4;

  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`

export default function AddCardCard({
  onClick,
}: {
  onClick: () => any
}): JSX.Element {
  return (
    <CardCardDiv selected={false} onClick={onClick}>
      <Img src="/icons/card.svg" />
      <AddCardText display="flex" alignItems="center" fontSize="1.8rem">
        <Span fontSize="2.5rem">+ </Span>
        Añadir una tarjeta
      </AddCardText>
    </CardCardDiv>
  )
}
