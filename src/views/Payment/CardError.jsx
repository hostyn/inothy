import styled from "styled-components";
import Img from "../../components/Img";
import Text from "../../components/Text";

const CardErrorDiv = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function CardError() {
  return (
    <CardErrorDiv>
      {/* <Img src="/error.svg" height="10rem" /> */}
      <Text fontSize="3rem" fontWeight="bold" color="secondary">
        Ha habido un problema
      </Text>
      <Text fontSize="1.5rem">
        Intentalo mas tarde o contacta con el soporte
      </Text>
    </CardErrorDiv>
  );
}
