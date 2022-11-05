import styled from "styled-components";
import Img from "../../components/Img";
import Text from "../../components/Text";

const SuccessDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function Success() {
  return (
    <SuccessDiv>
      <Img src="/check.svg" aspectRatio="1" width="10rem" height="auto" />
      <Text color="secondary" fontSize="4rem" fontWeight="bold">
        Comprado
      </Text>
      <Text fontSize="1.5rem">Gracias por comprar con nosotros</Text>
    </SuccessDiv>
  );
}
