import { Img, Text } from '@ui'
import styled from 'styled-components'

const EmailErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5rem;

  @media (max-width: 600px) {
    padding: 0 10vw;
  }
`

export default function EmailError () {
  return (
    <EmailErrorDiv>
      <Img src="/error.svg" height="6rem" />
      <Text
        textAlign="center"
        fontSize="1.5rem"
        color="secondary"
        fontFamily="HelveticaRounded"
        fontWeight="bold"
        margin="0.5rem 0 0 0"
      >
        No se ha podido enviar
      </Text>
      <Text textAlign="center">
        Este email no está registrado o ya se ha enviado un email recientemente.
      </Text>
    </EmailErrorDiv>
  )
}
