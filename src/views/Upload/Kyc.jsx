import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import Fileinput from "../../components/Fileinput";
import Img from "../../components/Img";
import { useAuth } from "../../context/authContext";

const KycDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export default function Kyc({ userData, handleSubmit }) {
  const { user } = useAuth();
  const [files, setFiles] = useState({
    front: null,
    back: null,
  });

  const handleChange = async ({ target }) => {
    if (!target.files.length) return;
    const base64 = await blobToBase64(target.files[0]);
    const objectPreview = URL.createObjectURL(target.files[0]);

    setFiles((files) => ({
      ...files,
      [target.name]: { base64, url: objectPreview },
    }));
  };

  return (
    <KycDiv>
      <Fileinput
        accept=".pdf, .jpeg, .jpg, .png"
        name="front"
        onChange={handleChange}
      >
        Anverso
      </Fileinput>
      {files.front && (
        <Img
          src={files.front.url}
          alt="asdf"
          height="200px"
          width="200px"
          aspectRatio="auto"
        />
      )}

      <Fileinput
        accept=".pdf, .jpeg, .jpg, .png"
        name="back"
        onChange={handleChange}
      >
        Reverso
      </Fileinput>
      {files.back && (
        <Img
          src={files.back.url}
          alt="asdf"
          height="200px"
          width="200px"
          aspectRatio="auto"
        />
      )}
      <Button onClick={() => handleSubmit(files)}>Finalizar</Button>
    </KycDiv>
  );
}
