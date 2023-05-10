import { Img, Text } from '@ui'
import styled from 'styled-components'

const KYCCOmpletedDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Error() {
  return (
    <KYCCOmpletedDiv>
      <Img
        src="/error.svg"
        aspectRatio="1"
        width="8rem"
        height="auto"
        priority
      />
      <Text
        fontSize="2rem"
        fontWeight="bold"
        color="secondary"
        textAlign="center"
        margin="1rem 0 0 0"
      >
        Ha habido un problema
      </Text>
      <Text textAlign="center">
        Intentalo mas tarde o contacta con el soporte
      </Text>
    </KYCCOmpletedDiv>
  )
}
