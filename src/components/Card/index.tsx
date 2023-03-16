import Link from 'next/link'
import styled from 'styled-components'
import { colors } from '@config/theme'
import { Img, Text } from '@ui'

const CardDiv = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 2rem;

  align-items: center;

  padding: 15px 2rem;
  border-radius: 20px;

  cursor: pointer;
  transition: 0.2s;

  :hover {
    background-color: ${colors.hover};
  }

  @media (max-width: 500px) {
    grid-template-columns: 3rem 1fr;
    gap: 1rem;
    padding: 10px;
  }
`

const CardImg = styled(Img)`
  height: 5rem;
  width: 5rem;

  @media (max-width: 500px) {
    height: 3rem;
    width: 3rem;
  }
`

interface CardProps {
  img: string
  text: string
  href: string
}

export default function Card({ img, text, href }: CardProps): JSX.Element {
  return (
    <Link href={href} passHref>
      <CardDiv>
        <CardImg src={img} />
        <Text fontSize="max(2vw, 1.2rem)" userSelect="none">
          {text}
        </Text>
      </CardDiv>
    </Link>
  )
}
