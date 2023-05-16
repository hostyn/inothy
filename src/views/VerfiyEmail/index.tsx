import Link from 'next/link'
import { A, Flex, Img, Text } from '@ui'
import styled from 'styled-components'
import { colors } from '@config/theme'

const StyledA = styled(A)`
  background-color: ${colors.secondary};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 10000px;
  font-weight: normal;
  font-size: 1.2rem;
`

interface VerifyEmailProps {
  verified?: boolean
}

export default function VerifyEmail({
  verified = false,
}: VerifyEmailProps): JSX.Element {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
    >
      <Img
        src="/imagotipo.svg"
        width="max(20vw, 10rem)"
        aspectRatio="100/31"
        height="initial"
      />
      {verified ? (
        <>
          <Text
            fontSize="max(3vw, 1.5rem)"
            margin="2rem 0 0 0"
            fontWeight="bold"
          >
            ¡Email verificado!
          </Text>

          <Text
            fontSize="max(1vw, 1rem)"
            textAlign="center"
            margin="0.5rem 1rem 1rem 1rem"
          >
            Completa tu perfil para disfrutar de nuestra web al completo.
          </Text>

          <Link href="/completeprofile" passHref>
            <StyledA>Completar perfil</StyledA>
          </Link>
        </>
      ) : (
        <>
          <Text
            fontSize="max(3vw, 1.5rem)"
            margin="2rem 0 0 0"
            fontWeight="bold"
            textAlign="center"
          >
            ¡No se ha podido verificar el email!
          </Text>

          <Text
            fontSize="max(1vw, 1rem)"
            textAlign="center"
            margin="0.5rem 1rem 1rem 1rem"
          >
            Es posible que el enlace haya sido utilizado o que esté caducado.
          </Text>

          <Link href="/" passHref>
            <StyledA>Volver al home</StyledA>
          </Link>
        </>
      )}
    </Flex>
  )
}
