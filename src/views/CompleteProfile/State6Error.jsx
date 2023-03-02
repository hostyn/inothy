import styled from 'styled-components'
import Button from '@ui/Button'
import Img from '@ui/Img'
import Text from '@ui/Text'

const ErrorDiv = styled.div`
  min-height: 100%;
  min-width: 100%;
  max-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const StyledButton = styled(Button)`
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 20px;
  }
`

export default function State6Error ({ setState }) {
  return (
    <ErrorDiv>
      <Img src="/error.svg" width="20vw" height="20vw" />
      <Title
        color="secondary"
        fontWeight="bold"
        fontFamily="HelveticaRounded"
        fontSize="2rem"
        textAlign="center"
        margin="1rem 0"
      >
        Ha habido un problema
      </Title>
      <Text fontSize="1.2rem" textAlign="center">
        Revisa la información o intentalo mas tarde
      </Text>
      <StyledButton
        height="auto"
        padding="10px 2rem"
        margin="1rem 0 0 0"
        onClick={() => setState('completeProfile')}
      >
        Revisar información
      </StyledButton>
    </ErrorDiv>
  )
}
