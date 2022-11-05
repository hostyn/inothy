import styled from "styled-components";
import Img from "../../components/Img";
import Text from "../../components/Text";

const ErrorDiv = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Error() {
  return (
    <ErrorDiv>
      <Img src="/error.svg" aspectRatio="1" width="10rem" height="auto" />
      <Text fontSize="3rem" fontWeight="bold" color="secondary">
        Ha habido un problema
      </Text>
      <Text fontSize="1.5rem">
        Intentalo mas tarde o contacta con el soporte
      </Text>
    </ErrorDiv>
  );
}
