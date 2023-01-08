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

  @media (max-width: 768px) {
    & p {
      font-size: 2rem;
    }
  }
`;

export default function State5Success() {
  return (
    <Success>
      <Img src="/check.svg" width="20vw" height="20vw" />
      <Text color="secondary" fontSize="4rem" fontWeight="bold">
        Bienvenid@
      </Text>
    </Success>
  );
}
