import styled from "styled-components";
import Text from "../../components/Text";

const KYCCOmpletedDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function KYCError() {
  return (
    <KYCCOmpletedDiv>
      <Text fontSize="4rem" fontWeight="bold" color="secondary">
        Ha habido un problema
      </Text>
      <Text fontSize="1.5rem">
        Intentalo mas tarde o contacta con el soporte
      </Text>
    </KYCCOmpletedDiv>
  );
}
