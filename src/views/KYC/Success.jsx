import Link from 'next/link'
import styled from 'styled-components'
import Button from '../../components/Button'
import Img from '../../components/Img'
import Text from '../../components/Text'

const KYCCOmpletedDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Success () {
  return (
    <KYCCOmpletedDiv>
      <Img
        src="/check.svg"
        aspectRatio="1"
        width="8rem"
        height="auto"
        priority
      />
      <Text
        fontSize="2rem"
        fontWeight="bold"
        color="secondary"
        margin="1rem 0 0 0"
        textAlign="center"
      >
        ¡Completado!
      </Text>
      <Text textAlign="center">
        Estamos revisando tu información, esto puede tardar un poco.
      </Text>
      <Text textAlign="center">Mientras tanto, ¡puedes subir tus apuntes!</Text>
      <Link href="/upload" passHref>
        <Button margin="1rem auto 0 auto" height="auto" padding="0.5rem 1rem">
          Subir apuntes
        </Button>
      </Link>
    </KYCCOmpletedDiv>
  )
}
