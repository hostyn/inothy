import styled from "styled-components";
import { colors } from "../config/theme";
import { useAuth } from "../context/authContext";
import { getDownloadUrl } from "../util/api";
import A from "./A";
import Button from "./Button";
import Img from "./Img";
import Text from "./Text";

const Card = styled.div`
  display: grid;
  grid-template-columns: 3rem auto min-content;
  gap: 1rem;
  border-radius: 10px;
  border: 3px solid ${colors.primary};
  align-items: center;

  width: 100%;
  max-width: 80rem;
  padding: 1rem;
`;

export default function DocumentCard({ docuemntData }) {
  const { user } = useAuth();

  const handleDownload = async () => {
    const { url } = await getDownloadUrl(
      user,
      docuemntData.subjectId,
      docuemntData.docId
    );

    const response = await fetch(url);
    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = href;
    element.download = docuemntData.fileName;
    element.click();
    element.remove();
    URL.revokeObjectURL(href);
  };

  return (
    <Card>
      <Img
        src="/icons/document.svg"
        aspectRatio="61/75"
        height="3rem"
        width="auto"
      />
      <A
        color="primary"
        fontSize="1.5rem"
        href={`/subject/${docuemntData.subjectId}/${docuemntData.docId}`}
      >
        {docuemntData.name}
      </A>
      <Button padding="0.5rem 1rem" onClick={handleDownload}>
        Descargar
      </Button>
    </Card>
  );
}
