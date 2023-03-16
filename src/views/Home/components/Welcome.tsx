import AuthModal from '@components/Auth/AuthModal'
import { sizes } from '@config/theme'
import { useModal } from '@context/modalContext'
import { Button, Text } from '@ui'
import styled from 'styled-components'

const WelcomeDiv = styled.div`
  min-height: inherit;
  background-image: url('/resources/home/background.svg');
  background-repeat: no-repeat;
  background-size: auto;
  background-position: top center;
  margin: 0 5rem;
  padding: ${sizes.navbar} 5rem 0 5rem;

  @media (max-width: 1000px) {
    margin: 0 3rem;
    padding: ${sizes.navbar} 0 0 0;
  }

  @media (max-width: 768px) {
    margin: 0;
    padding: ${sizes.navbar} 2rem 0 2rem;
  }
`

const BackgroundImageDiv = styled.div`
  background-image: url('/resources/home/resource1.svg');
  background-repeat: no-repeat;
  background-size: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  aspect-ratio: 92/75;
  width: 100%;
  height: calc((100vw - 20rem) * 75 / 92);

  @media (max-width: 1000px) {
    height: calc((100vw - 6rem) * 75 / 92);
  }

  @media (max-width: 768px) {
    background-image: url('/resources/home/resource1mobile.svg');
    height: calc((100vw - 4rem) * 1037 / 1142);
  }
`

const FloatingDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -20%;
`

const WelcomeText = styled(Text)`
  @media (max-width: 768px) {
    margin: 4vw 0 0 0;
    font-size: 7vw;
  }
`

const WelcomeSubtext = styled(Text)`
  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`

const WelcomeEphasis = styled(Text)`
  @media (max-width: 768px) {
    font-size: 5vw;
  }
`

const WelcomeButton = styled(Button)`
  @media (max-width: 768px) {
    font-size: 3vw;
  }
`

export default function Welcome(): JSX.Element {
  const { openModal } = useModal()

  return (
    <WelcomeDiv>
      <BackgroundImageDiv>
        <FloatingDiv>
          <WelcomeText
            fontFamily="WaffleStory"
            fontSize="5vw"
            textAlign="center"
          >
            Bienvenid@
          </WelcomeText>
          <WelcomeSubtext
            fontFamily="WaffleStory"
            fontSize="2vw"
            textAlign="center"
            color="secondary"
          >
            acabas de dar el
          </WelcomeSubtext>
          <WelcomeSubtext
            fontFamily="WaffleStory"
            fontSize="2vw"
            textAlign="center"
          >
            primer paso
          </WelcomeSubtext>
          <WelcomeEphasis
            fontFamily="WaffleStory"
            fontSize="3vw"
            textAlign="center"
            color="secondary"
          >
            para aprobar
          </WelcomeEphasis>

          <WelcomeButton
            margin="1vw auto auto auto"
            fontSize="1.5vw"
            background="primary"
            onClick={() => {
              openModal(<AuthModal selected="register" />)
            }}
          >
            Apuntes
          </WelcomeButton>
        </FloatingDiv>
      </BackgroundImageDiv>
    </WelcomeDiv>
  )
}
