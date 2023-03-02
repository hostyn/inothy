import styled from 'styled-components'
import Img from '@ui/Img'
import Text from '@ui/Text'

const ErrorDiv = styled.div`
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

const StyledTitle = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 2rem;
  }
`

const StyledText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1.2rem;
  }
`

export default function Error () {
  return (
    <ErrorDiv>
      <StyledImg src="/error.svg" aspectRatio="1" width="10rem" height="auto" />
      <StyledTitle
        color="secondary"
        fontSize="4rem"
        fontWeight="bold"
        textAlign="center"
        margin="1rem 0 0 0"
      >
        Ha ocurrido un error
      </StyledTitle>
      <StyledText fontSize="1.5rem" textAlign="center" margin="1rem 0 0 0">
        Vuelve a intentarlo o contacta con el soporte
      </StyledText>
    </ErrorDiv>
  )
}
