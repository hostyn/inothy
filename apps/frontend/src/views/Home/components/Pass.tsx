import { Flex, Img, Text } from '@ui'
import styled from 'styled-components'

const IdeaFrameDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  justify-items: center;
  justify-content: center;
  margin: 10rem 0 0 0;

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 5rem 0 0 0;
  }
`

const StyledSubTitle = styled(Text)`
  @media (max-width: 750px) {
    font-size: 2rem;
  }
`

const StyledText = styled(Text)`
  @media (max-width: 750px) {
    font-size: 1.2rem;
  }
`

export default function Pass(): JSX.Element {
  return (
    <IdeaFrameDiv>
      <Flex>
        <StyledSubTitle
          fontFamily="HelveticaRounded"
          fontSize="4vw"
          textAlign="center"
          width="100%"
        >
          Asegúrate tu
        </StyledSubTitle>
        <StyledSubTitle
          fontFamily="HelveticaRounded"
          fontSize="4vw"
          textAlign="center"
          width="100%"
        >
          aprobado
        </StyledSubTitle>
        <StyledText
          fontSize="2rem"
          color="secondary"
          textAlign="center"
          margin="2rem 0 0 0"
          width="100%"
        >
          Comprobamos la calidad de nuestro apuntes.
        </StyledText>
        <StyledText
          fontSize="2rem"
          color="secondary"
          textAlign="center"
          width="100%"
        >
          Dónde los mejores estudiantes suben su material.
        </StyledText>
      </Flex>
      <Img
        src="/resources/home/asegurate.svg"
        aspectRatio="153/150"
        width="70%"
      />
    </IdeaFrameDiv>
  )
}
