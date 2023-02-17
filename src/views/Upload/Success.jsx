import styled from 'styled-components'
import Img from '../../components/Img'
import Text from '../../components/Text'

const SuccessDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledImg = styled(Img)`
  @media (max-width: 1000px) {
    height: 6rem;
    width: 6rem;
  }
`

const StyledText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 2rem;
  }
`

export default function Success () {
  return (
    <SuccessDiv>
      <StyledImg src="/check.svg" width="10rem" height="10rem" />
      <StyledText
        color="secondary"
        fontSize="4rem"
        fontWeight="bold"
        textAlign="center"
        margin="1rem 0 0 0"
      >
        Archivo subido
      </StyledText>
    </SuccessDiv>
  )
}
