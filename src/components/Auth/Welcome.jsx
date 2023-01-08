import Img from "../Img";
import styled from "styled-components";
import Text from "../Text";
import Span from "../Span";
import { useModal } from "../../context/modalContext";

const WelcomeDiv = styled.div`
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  user-select: none;
  padding: 1rem;

  grid-template-rows: 10rem 8rem auto auto;
  gap: 1rem;

  @media (max-width: 550px) {
    grid-template-rows: 8rem 5rem auto auto;
  }
`;

const WelcomeText = styled(Text)`
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const OtherText = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const SpanText = styled(Span)`
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export default function Welcome() {
  const { closeModal } = useModal();
  return (
    <WelcomeDiv onClick={closeModal}>
      <Img src="/imagotipo2.svg" />
      <Img src="/check.svg" />
      <WelcomeText color="secondary" fontSize="6rem" fontWeight="bold">
        Bienvenid@
      </WelcomeText>
      <OtherText fontSize="1.5rem" textAlign="center">
        Ya eres un{" "}
        <SpanText fontSize="1.8rem" fontWeight="bold">
          Inother{" "}
        </SpanText>
        más.
      </OtherText>
      <OtherText fontSize="1.5rem" textAlign="center">
        No olvides verificar tu correo para poder continuar con el proceso.
      </OtherText>
    </WelcomeDiv>
  );
}
