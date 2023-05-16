import { colors } from '@config/theme'
import { Flex, Img, Text } from '@ui'
import styled from 'styled-components'

const CardDiv = styled.div<{ firstElement?: boolean }>`
  background-color: ${colors.emphasis};
  border-radius: ${props => (props.firstElement != null ? '2vw 2vw 0 0' : '0')};
`

const CardHeader = styled.div<{ secondary?: boolean }>`
  display: grid;
  grid-template-columns: 5vw 1fr 5vw;
  gap: 1rem;
  padding: 2rem;
  align-items: center;
  z-index: 10;
  font-size: max(3vw, 1.5rem);

  background-color: ${props =>
    props.secondary != null ? colors.secondary : colors.primary};
  border-radius: 2vw;

  @media (max-width: 1000px) {
    grid-template-columns: 2rem 1fr 5vw;
    padding: 1.5rem;
  }
`

const CardBody = styled.div<{ lastElement?: boolean }>`
  display: flex;
  flex-direction: column;

  background-color: ${colors.emphasis};
  padding: 6rem;
  border-radius: ${props => (props.lastElement != null ? '0 0 2vw 2vw' : '0')};

  @media (max-width: 1200px) {
    padding: 4rem;
  }

  @media (max-width: 1000px) {
    padding: 2rem;
  }
`

interface CardProps {
  title: string
  img: string
  children: JSX.Element | JSX.Element[]
  firstElement?: boolean
  lastElement?: boolean
  secondary?: boolean
}

export default function Card({
  title,
  img,
  children,
  firstElement,
  lastElement,
  secondary,
}: CardProps): JSX.Element {
  return (
    <Flex>
      <CardDiv firstElement={firstElement}>
        <CardHeader secondary={secondary}>
          <Img src={img} height="1.5em" width="auto" />
          <Text color="white" fontWeight="bold" fontSize="1em">
            {title}
          </Text>
        </CardHeader>
      </CardDiv>
      <CardBody lastElement={lastElement}>{children}</CardBody>
    </Flex>
  )
}
