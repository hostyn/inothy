import { Flex, Img, Span, Text } from '@ui'
import styled from 'styled-components'

const GetDocumentsDiv = styled.div`
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

const TwoImg = styled(Img)`
  height: calc((100vw - 20rem) / 2 * 0.8 * 150 / 141);

  @media (max-width: 1000px) {
    height: calc((100vw - 6rem) * 0.8 * 150 / 141);
  }

  @media (max-width: 768px) {
    height: calc((100vw - 4rem) * 0.8 * 150 / 141);
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

export default function GetDocuments(): JSX.Element {
  return (
    <GetDocumentsDiv>
      <TwoImg
        src="/resources/home/dosclicks.svg"
        aspectRatio="141/150"
        width="80%"
      />
      <Flex>
        <StyledSubTitle
          fontFamily="HelveticaRounded"
          textAlign="center"
          fontSize="4vw"
        >
          Consigue tus
        </StyledSubTitle>
        <StyledSubTitle
          fontFamily="HelveticaRounded"
          textAlign="center"
          fontSize="4vw"
        >
          apuntes en <Span color="secondary">dos clics</Span>
        </StyledSubTitle>
        <StyledText
          color="secondary"
          fontSize="2rem"
          textAlign="center"
          margin="2rem 0 0 0"
        >
          ¿Te has quedado sin tiempo?
        </StyledText>
        <StyledText color="secondary" fontSize="2rem" textAlign="center">
          Te lo dejamos todo fácil y organizado.
        </StyledText>
      </Flex>
    </GetDocumentsDiv>
  )
}
