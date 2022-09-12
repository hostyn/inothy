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
`;

export default function Welcome() {
  const { closeModal } = useModal();
  return (
    <WelcomeDiv onClick={closeModal}>
      <Img
        src="/imagotipo2.svg"
        aspectRatio="63/50"
        margin="0 0 3rem 0"
        width="50%"
      />
      <Img src="/check.svg" aspectRatio="1" margin="0 0 3rem 0" width="20%" />
      <Text color="secondary" fontSize="6rem" fontWeight="bold">
        Bienvenid@
      </Text>
      <Text fontSize="1.5rem" margin="1rem 0 0 0">
        Ya formas parte de la comunidad de{" "}
        <Span fontSize="2rem" fontWeight="bold">
          Inothy
        </Span>
      </Text>
      <Text fontSize="1.5rem">
        No olvides verificar tu correo para poder continuar
      </Text>
      <Text fontSize="1.5rem">con el proceso.</Text>
    </WelcomeDiv>
  );
}
