import { Img, Text } from '@ui'
import styled from 'styled-components'

const EmailSentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5rem;

  @media (max-width: 600px) {
    padding: 0 10vw;
  }
`

export default function EmailSent () {
  return (
    <EmailSentDiv>
      <Img src="/check.svg" height="6rem" />
      <Text
        textAlign="center"
        fontSize="1.5rem"
        color="secondary"
        fontFamily="HelveticaRounded"
        fontWeight="bold"
        margin="0.5rem 0 0 0"
      >
        Email enviado
      </Text>
      <Text textAlign="center">
        Revisa tu bandeja de entrada para cambiar tu contraseña
      </Text>
    </EmailSentDiv>
  )
}
