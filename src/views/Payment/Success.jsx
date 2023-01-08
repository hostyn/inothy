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

export default function Success() {
  return (
    <SuccessDiv>
      <Img src="/check.svg" width="6rem" height="6rem" />
      <Title
        color="secondary"
        fontSize="4rem"
        fontWeight="bold"
        textAlign="center"
        margin="1rem 0 0 0"
      >
        Comprado
      </Title>
      <Subtitle fontSize="1.5rem" textAlign="center">
        Gracias por comprar con nosotros
      </Subtitle>
    </SuccessDiv>
  );
}
