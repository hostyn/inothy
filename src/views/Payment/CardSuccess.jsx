import Img from "../../components/Img";
import styled from "styled-components";
import Text from "../../components/Text";

const CardSuccessDiv = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function CardSuccess() {
  return (
    <CardSuccessDiv>
      <Img src="/check.svg" height="10rem" />
      <Text
        fontSize="3rem"
        fontWeight="bold"
        margin="1rem 0 0 0"
        color="secondary"
      >
        Tarjeta añadida
      </Text>
      <Text fontSize="1.5rem">
        Ya puedes utilizar la tarjeta para comprar en Inothy.
      </Text>
    </CardSuccessDiv>
  );
}
