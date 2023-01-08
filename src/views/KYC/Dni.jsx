import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import Fileinput from "../../components/Fileinput";
import Img from "../../components/Img";
import Text from "../../components/Text";
import { colors } from "../../config/theme";
import blobToBase64 from "../../util/blobToB64";

const acceptedMimes = ["application/pdf", "image/jpeg", "image/png"];

const DniDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DniGrid = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const DniCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const InlineText = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImg = styled(Img)`
  height: calc(16rem * 75 / 122);
  width: 16rem;
  @media (max-width: 900px) {
    height: calc(13rem * 75 / 122);
    width: 13rem;
  }

  @media (max-width: 768px) {
    height: calc(13rem * 75 / 122);
    width: 13rem;
  }
`;

export default function Dni({ setState, handleKYCSubmit }) {
  const [error, setError] = useState({ front: null, back: null });
  const [files, setFiles] = useState({ front: null, back: null });

  const handleChange = ({ target }) => {
    setError((error) => ({ ...error, [target.name]: null }));

    const file = target.files[0];

    if (!acceptedMimes.includes(file.type)) {
      setError((error) => ({
        ...error,
        [target.name]: "Tipo de archivo no admitido",
      }));
      setFiles((files) => ({ ...files, [target.name]: null }));
      return;
    }

    if (file.size < 32768) {
      setError((error) => ({
        ...error,
        [target.name]: "El archivo es demasiado pequeño",
      }));
      setFiles((files) => ({ ...files, [target.name]: null }));
      return;
    }

    if (file.size > 10485760) {
      setError((error) => ({
        ...error,
        [target.name]: "El archivo es demasiado grande",
      }));
      setFiles((files) => ({ ...files, [target.name]: null }));
      return;
    }

    setFiles((files) => ({ ...files, [target.name]: file }));
  };

  const verifyData = () => {
    let anyError = false;

    if (!files.front) {
      setError((error) => ({ ...error, front: "Debes subir un archivo" }));
      anyError = true;
    }

    if (!files.back) {
      setError((error) => ({ ...error, back: "Debes subir un archivo" }));
      anyError = true;
    }

    return anyError;
  };

  const handleSubmit = async () => {
    const error = verifyData();
    if (error) return;

    const b64files = await Promise.all([
      blobToBase64(files.front),
      blobToBase64(files.back),
    ]);

    handleKYCSubmit(b64files);
  };

  return (
    <DniDiv>
      <Text
        margin="0 auto 0 0"
        fontSize="2rem"
        color="secondary"
        fontWeight="bold"
        fontFamily="HelveticaRounded"
      >
        DNI O CARNET DE CONDUCIR
      </Text>
      <DniGrid>
        <DniCard>
          <StyledImg src="/resources/kyc/front.svg" />
          <Fileinput
            name="front"
            accept="application/pdf, image/jpeg, image/png"
            margin="10px 0 0 0"
            onChange={handleChange}
          >
            Adjuntar anverso
          </Fileinput>
          <Text
            color={error.front ? "secondary" : "disabledColor"}
            fontSize="1.1rem"
          >
            {error.front || files.front?.name}
          </Text>
        </DniCard>

        <DniCard>
          <StyledImg src="/resources/kyc/back.svg" />
          <Fileinput
            name="back"
            accept="application/pdf, image/jpeg, image/png"
            margin="10px 0 0 0"
            onChange={handleChange}
          >
            Adjuntar reverso
          </Fileinput>
          <Text
            color={error.back ? "secondary" : "disabledColor"}
            fontSize="1.1rem"
          >
            {error.back || files.back?.name}
          </Text>
        </DniCard>
      </DniGrid>
      <InlineText>
        <Button
          margin="0 auto 0 0"
          height="auto"
          padding="0.5rem 1rem"
          background="white"
          color="primary"
          border={`2px solid ${colors.primary}`}
          onClick={() => setState("documentselection")}
        >
          Atrás
        </Button>
        <Button
          margin="0"
          height="auto"
          padding="0.5rem 1rem"
          onClick={handleSubmit}
        >
          Subir
        </Button>
      </InlineText>
    </DniDiv>
  );
}
