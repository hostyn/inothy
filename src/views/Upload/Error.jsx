import styled from "styled-components";
import Img from "../../components/Img";
import Text from "../../components/Text";

const ErrorDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function Error() {
  return (
    <ErrorDiv>
      <Img src="/error.svg" aspectRatio="1" width="10rem" height="auto" />
      <Text color="secondary" fontSize="4rem" fontWeight="bold">
        Ha ocurrido un error
      </Text>
      <Text fontSize="1.5rem">
        Vuelve a intentarlo o contacta con el soporte
      </Text>
    </ErrorDiv>
  );
}
