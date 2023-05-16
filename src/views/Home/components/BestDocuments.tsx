import AuthModal from '@components/Auth/AuthModal'
import { useModal } from '@context/modalContext'
import { Button, Img, Span, Text } from '@ui'
import styled from 'styled-components'

const BestDocumentsDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  justify-items: center;
  justify-content: center;
  margin: 5rem 0;

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 5rem 0 0 0;
  }
`

const MejoresText = styled.div`
  background-image: url('/resources/home/background2.svg');
  background-repeat: no-repeat;
  background-size: auto;
  background-position: top center;
  padding: 20% 10% 10% 10%;

  width: 100%;
  height: calc((100vw - 20rem) / 2);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 750px) {
    height: calc(100vw - 4rem);
    padding: 3rem 0 0 0;
  }
`

const MejoresImg = styled(Img)`
  width: calc((100vw - 20rem) / 2);
  height: calc((100vw - 20rem) / 2 * 0.8 * 30 / 31);

  @media (max-width: 1000px) {
    width: calc((100vw - 6rem) / 2);
    height: calc((100vw - 6rem) / 2 * 0.8 * 30 / 31);
  }

  @media (max-width: 768px) {
    width: calc((100vw - 4rem) / 2);
    height: calc((100vw - 4rem) / 2 * 0.8 * 30 / 31);
  }

  @media (max-width: 750px) {
    width: calc((100vw - 4rem));
    height: calc((100vw - 4rem) * 0.8 * 30 / 31);
  }
`

const StyledText2 = styled(Text)`
  @media (max-width: 750px) {
    font-size: 1.5rem;
  }
`

const StyledButton = styled(Button)`
  @media (max-width: 750px) {
    font-size: 1rem;
    padding: 0.3rem 1rem;
  }
`

const StyledText = styled(Text)`
  @media (max-width: 750px) {
    font-size: 1.2rem;
  }
`

export default function BestDocuments(): JSX.Element {
  const { openModal } = useModal()

  return (
    <BestDocumentsDiv>
      <MejoresText>
        <StyledText2
          fontFamily="HelveticaRounded"
          fontSize="2.5vw"
          textAlign="center"
        >
          ¿Crees que tienes los <Span color="secondary">mejores apuntes?</Span>
        </StyledText2>

        <StyledText fontSize="2vw" color="secondary" textAlign="center">
          ¿Quiéres ganar dinero ayudando a otros estudiantes?
        </StyledText>

        <StyledText fontSize="2vw">Inothy es tu sitio.</StyledText>
        <StyledButton
          height="auto"
          padding="0.5rem 2rem"
          margin="1vw 0 0 0"
          onClick={() => {
            openModal(<AuthModal selected="register" />)
          }}
        >
          Registrate
        </StyledButton>
      </MejoresText>
      <MejoresImg
        src="/resources/home/resource4.svg"
        aspectRatio="31/30"
        margin="0 0 2rem 0"
      />
    </BestDocumentsDiv>
  )
}
