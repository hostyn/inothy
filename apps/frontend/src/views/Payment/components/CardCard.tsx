import LoadingRing from '@components/LoadingRing'
import { colors } from '@config/theme'
import { Flex, Img, Text } from '@ui'
import { deleteCard } from '@util/api'
import { type card } from 'mangopay2-nodejs-sdk'
import { useState } from 'react'
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

const CardAlias = styled(Text)`
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`

const StyledLoadingRing = styled(LoadingRing)`
  width: 100%;
  height: 100%;
`

interface CardCardProps {
  card: card.CardData
  selected: boolean
  onClick: () => any
  onDelete: () => any
}

export default function CardCard({
  card,
  selected,
  onClick,
  onDelete,
}: CardCardProps): JSX.Element {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async (): Promise<void> => {
    setDeleting(true)
    await deleteCard(card.Id)
    onDelete()
  }

  return (
    <CardCardDiv selected={selected} key={card.Id} onClick={onClick}>
      <Img src="/icons/card.svg" />
      <Flex>
        <CardAlias fontSize="1.3rem" userSelect="none">
          {card.Alias}
        </CardAlias>
        <Text userSelect="none">
          {card.ExpirationDate.substring(0, 2)}/
          {card.ExpirationDate.substring(2, 4)} |{' '}
          {card.CardProvider === 'unknown' ? 'Desconocido' : card.CardProvider}
        </Text>
      </Flex>
      {deleting ? (
        <StyledLoadingRing />
      ) : (
        <Img src="/icons/trash.svg" onClick={handleDelete} />
      )}
    </CardCardDiv>
  )
}
