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

const Title = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default function Error() {
  return (
    <ErrorDiv>
      <Img src="/error.svg" width="6rem" height="6rem" />
      <Title
        fontSize="3rem"
        fontWeight="bold"
        color="secondary"
        textAlign="center"
        margin="1rem 0 0 0"
      >
        Ha habido un problema
      </Title>
      <Subtitle fontSize="1.5rem" textAlign="center">
        Intentalo mas tarde o contacta con el soporte
      </Subtitle>
    </ErrorDiv>
  );
}
