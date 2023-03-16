import { Flex, Img, Span, Text } from '@ui'
import styled from 'styled-components'

const NeedHelpDiv = styled.div`
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

const HelpImg = styled(Img)`
  @media (max-width: 750px) {
    height: calc((100vw - 4rem) * 150 / 173);
  }
`

const StyledText2 = styled(Text)`
  @media (max-width: 750px) {
    font-size: 1.5rem;
  }
`

const StyledTitle = styled(Text)`
  @media (max-width: 750px) {
    font-size: 3rem;
  }
`

export default function NeedHelp(): JSX.Element {
  return (
    <NeedHelpDiv>
      <Flex>
        <StyledTitle
          fontFamily="HelveticaRounded"
          fontSize="6vw"
          textAlign="center"
        >
          <Span color="secondary">¿</Span>Necesitas ayuda
        </StyledTitle>
        <StyledTitle
          fontFamily="HelveticaRounded"
          fontSize="6vw"
          textAlign="center"
        >
          con alguna asignatura<Span color="secondary">?</Span>
        </StyledTitle>
        <StyledText2
          fontFamily="VarelaRound"
          fontSize="3rem"
          margin="3rem 0 0 0"
          color="secondary"
        >
          Tenemos los apuntes que tanta falta te hacen.
        </StyledText2>
        <StyledText2 fontFamily="VarelaRound" fontSize="3rem" color="secondary">
          De cualquier carrera y cualquier asignatura.
        </StyledText2>
      </Flex>
      <HelpImg src="/resources/home/necesitas.svg" aspectRatio="173/150" />
    </NeedHelpDiv>
  )
}
