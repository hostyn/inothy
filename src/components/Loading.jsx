import styled from "styled-components";
import Text from "./Text";

const LoadingDiv = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loading() {
  return (
    <LoadingDiv>
      <Text fontSize="4rem">Cargando...</Text>
    </LoadingDiv>
  );
}
