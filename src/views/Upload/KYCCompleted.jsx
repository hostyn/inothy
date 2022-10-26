import styled from "styled-components";
import Text from "../../components/Text";

const KYCCOmpletedDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function KYCCompleted() {
  return (
    <KYCCOmpletedDiv>
      <Text fontSize="4rem" fontWeight="bold" color="secondary">
        ¡Ya puedes subir tus apuntes!
      </Text>
      <Text fontSize="1.5rem">En unos días verificaremos tu identidad</Text>
    </KYCCOmpletedDiv>
  );
}
