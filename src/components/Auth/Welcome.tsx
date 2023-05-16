import { useModal } from '@context/modalContext'
import { Img, Span, Text } from '@ui'
import styled from 'styled-components'

const WelcomeDiv = styled.div`
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  user-select: none;
  padding: 1rem;

  grid-template-rows: 10rem auto auto auto;
  gap: 1rem;

  @media (max-width: 550px) {
    grid-template-rows: 8rem auto auto auto;
  }
`

const WelcomeText = styled(Text)`
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const OtherText = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const SpanText = styled(Span)`
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`

export default function Welcome(): JSX.Element {
  const { closeModal } = useModal()
  return (
    <WelcomeDiv onClick={closeModal}>
      <Img src="/imagotipo2.svg" />
      <WelcomeText color="secondary" fontSize="5rem" fontWeight="bold">
        Bienvenid@
      </WelcomeText>
      <OtherText fontSize="1.5rem" textAlign="center">
        Ya eres un{' '}
        <SpanText fontSize="1.8rem" fontWeight="bold">
          Inother{' '}
        </SpanText>
        más.
      </OtherText>
      <OtherText fontSize="1.5rem" textAlign="center">
        No olvides verificar tu correo para poder continuar con el proceso.
      </OtherText>
    </WelcomeDiv>
  )
}
