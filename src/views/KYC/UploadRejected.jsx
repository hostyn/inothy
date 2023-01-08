import styled from "styled-components";
import Button from "../../components/Button";
import Img from "../../components/Img";
import Text from "../../components/Text";
import { colors } from "../../config/theme";

const UploadInfoDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InlineText = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 7.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 5rem;

    & p {
      font-size: 1.5rem;
    }

    & div {
      width: 5rem;
      height: calc(5rem * 3 / 4);
    }
  }
`;

const Columns = styled.div`
  margin: 0 0 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 10rem 2rem 1fr;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 5rem 2rem 1fr;
  }
`;

const StyledImg = styled(Img)`
  height: 6rem;

  @media (max-width: 768px) {
    height: 3rem;
  }
`;

const StyledText = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function UploadRejected({ setState }) {
  return (
    <UploadInfoDiv>
      <InlineText>
        <Text
          margin="0 auto 0 0"
          fontSize="2rem"
          color="secondary"
          fontWeight="bold"
        >
          Verificación de identidad
        </Text>
        <Img src="/resources/kyc/icon.svg" width="7.5rem" height="5.625rem" />
      </InlineText>
      <StyledText fontSize="1.5rem" fontWeight="bold" margin="1rem 0 0 0">
        No se aceptarán:
      </StyledText>

      <Columns>
        <Card>
          <StyledImg src="/resources/kyc/border.svg" />
          <Img src="/icons/forbidden.svg" width="2rem" height="2rem" />
          <StyledText fontSize="1.5rem">Sin los bordes visibles</StyledText>
        </Card>
        <Card>
          <StyledImg src="/resources/kyc/two.svg" />
          <Img src="/icons/forbidden.svg" width="2rem" height="2rem" />
          <StyledText fontSize="1.5rem">
            Con ambas caras en el mismo archivo
          </StyledText>
        </Card>
        <Card>
          <StyledImg src="/resources/kyc/flash.svg" />
          <Img src="/icons/forbidden.svg" width="2rem" height="2rem" />
          <StyledText fontSize="1.5rem">Con reflejos de flash</StyledText>
        </Card>
        <Card>
          <StyledImg src="/resources/kyc/blur.svg" />
          <Img src="/icons/forbidden.svg" width="2rem" height="2rem" />
          <StyledText fontSize="1.5rem">Borrosas o desenfocadas</StyledText>
        </Card>
        <Card>
          <StyledImg src="/resources/kyc/black.svg" />
          <Img src="/icons/forbidden.svg" width="2rem" height="2rem" />
          <StyledText fontSize="1.5rem">En blanco y negro</StyledText>
        </Card>
        <Card>
          <StyledImg src="/resources/kyc/finger.svg" />
          <Img src="/icons/forbidden.svg" width="2rem" height="2rem" />
          <StyledText fontSize="1.5rem">
            Con dedos o objetos que tapen el documento
          </StyledText>
        </Card>
      </Columns>
      <ButtonsDiv>
        <Button
          margin="0 auto 0 0"
          height="auto"
          padding="0.5rem 1rem"
          background="white"
          color="primary"
          border={`2px solid ${colors.primary}`}
          onClick={() => setState("uploadaccepted")}
        >
          Atrás
        </Button>
        <Button
          margin="0"
          height="auto"
          padding="0.5rem 1rem"
          onClick={() => setState("documentselection")}
        >
          Siguiente
        </Button>
      </ButtonsDiv>
    </UploadInfoDiv>
  );
}
