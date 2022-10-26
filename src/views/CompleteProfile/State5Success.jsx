import styled from "styled-components";
import Img from "../../components/Img";
import Text from "../../components/Text";

const Success = styled.div`
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function State5Success() {
  return (
    <Success>
      {/* <Img
        src="/imagotipo2.svg"
        aspectRatio="63/50"
        width="30%"
        height="auto"
        margin="0 0 2rem 0"
      /> */}
      <Img src="/check.svg" aspectRatio="1" width="20%" height="auto" />
      <Text color="secondary" fontSize="4rem" fontWeight="bold">
        Bienvenid@
      </Text>
    </Success>
  );
}
