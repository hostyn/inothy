import Img from '@ui/Img'
import styled from 'styled-components'
import Text from '@ui/Text'

const CardSuccessDiv = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const Subtitle = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export default function CardSuccess () {
  return (
    <CardSuccessDiv>
      <Img src="/check.svg" height="6rem" width="6rem" />
      <Title
        fontSize="3rem"
        fontWeight="bold"
        margin="1rem 0 0 0"
        color="secondary"
        textAlign="center"
      >
        Tarjeta añadida
      </Title>
      <Subtitle fontSize="1.5rem" textAlign="center">
        Ya puedes utilizar la tarjeta para comprar en Inothy.
      </Subtitle>
    </CardSuccessDiv>
  )
}
