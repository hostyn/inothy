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

const TextWithCheck = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 2rem 1fr;
  gap: 1rem;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Rules = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 1rem 0;
`;

const StyledImg = styled(Img)`
  @media (max-width: 900px) {
    display: none;
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

export default function UploadAccepted({ setState }) {
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
        Solo se aceptarán:
      </StyledText>
      <Columns>
        <Rules>
          <TextWithCheck>
            <Img src="/icons/check.svg" width="2rem" height="2rem" />
            <StyledText fontSize="1.5rem">
              Documentos que sean válidos y actualizados.
            </StyledText>
          </TextWithCheck>
          <TextWithCheck>
            <Img src="/icons/check.svg" width="2rem" height="2rem" />
            <StyledText fontSize="1.5rem">
              Que concuerden con la información proporcionada.
            </StyledText>
          </TextWithCheck>
          <TextWithCheck>
            <Img src="/icons/check.svg" width="2rem" height="2rem" />
            <StyledText fontSize="1.5rem">
              En el formato adecuado: pdf, jpg, jpeg o png.
            </StyledText>
          </TextWithCheck>
          <TextWithCheck>
            <Img src="/icons/check.svg" width="2rem" height="2rem" />
            <StyledText fontSize="1.5rem">
              De tamaño entre 32KB y 10MB.
            </StyledText>
          </TextWithCheck>
          <TextWithCheck>
            <Img src="/icons/check.svg" width="2rem" height="2rem" />
            <StyledText fontSize="1.5rem">
              De personas mayores de 18 años.
            </StyledText>
          </TextWithCheck>
        </Rules>
        <StyledImg src="/resources/kyc/good.svg" width="70%" margin="auto" />
      </Columns>
      <ButtonsDiv>
        <Button
          margin="0 auto 0 0"
          height="auto"
          padding="0.5rem 1rem"
          background="white"
          color="primary"
          border={`2px solid ${colors.primary}`}
          onClick={() => setState("completeProfileInfo")}
        >
          Atrás
        </Button>
        <Button
          margin="0"
          height="auto"
          padding="0.5rem 1rem"
          onClick={() => setState("uploadrejected")}
        >
          Siguiente
        </Button>
      </ButtonsDiv>
    </UploadInfoDiv>
  );
}
