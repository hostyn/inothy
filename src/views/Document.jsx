import { getDownloadURL, ref } from "firebase/storage";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import A from "../components/A";
import App from "../components/App";
import AuthModal from "../components/Auth/AuthModal";
import Button from "../components/Button";
import Img from "../components/Img";
import Pdf from "../components/Pdf";
import Span from "../components/Span";
import Text from "../components/Text";
import { logEvent, storage } from "../config/firebase";
import { colors, sizes } from "../config/theme";
import { useAuth } from "../context/authContext";
import { useModal } from "../context/modalContext";
import { getDownloadUrl } from "../util/api";
import mimeTypes from "../util/mimeTypes";
import { currencyFormatter } from "../util/normailize";
import Payment from "./Payment/Payment";

const DocumentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem calc(${sizes.inlineMargin} * 2);

  @media (max-width: 1500px) {
    margin: 2rem ${sizes.inlineMargin};
  }

  @media (max-width: 1000px) {
    margin: 2rem;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem 0;
`;

const TitleText = styled(Text)`
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TitleImg = styled(Img)`
  width: 8vw;
  height: 8vw;

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
`;

const DocumentBody = styled.div`
  margin: 1rem 0 4rem 0;
  display: grid;
  grid-template-columns: 25vw 1fr;
  gap: 3rem;

  @media (max-width: 1200px) {
    grid-template-columns: 40vw 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const VerticalAlign = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PaymentModal = styled.div`
  background-color: ${colors.white};
  display: grid;
  min-height: 40rem;
  width: 70vw;
  padding: 3rem;
  border-radius: 20px;

  @media (max-width: 1000px) {
    width: 90vw;
    padding: 3rem 2rem;
  }

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const CloseButton = styled.button`
  font-size: 1.7rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
  font-family: "VarelaRound";
  color: ${colors.primary};
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const StyledPdf = styled(Pdf)`
  width: 100%;

  @media (max-width: 768px) {
    width: calc(100vw - 4rem);
  }
`;

const NoPreviewDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${colors.primary};
  width: 25vw;
  height: calc(25vw * 25 / 19);

  @media (max-width: 1200px) {
    width: 40vw;
    height: calc(40vw * 25 / 19);
  }

  @media (max-width: 768px) {
    width: calc(100vw - 4rem);
    height: calc((100vw - 4rem) * 25 / 19);
  }
`;

const DocumentTitle = styled(Text)`
  word-break: break-word;
`;

const Username = styled(A)`
  word-break: break-word;
  user-select: none;
  cursor: default;

  :hover {
    text-decoration: none;
  }
`;

const StyledDescription = styled(Text)`
  white-space: pre-line;
`;

const NoPreview = ({ mimeType }) => {
  return (
    <NoPreviewDiv>
      <Img
        src={`/icons/files/${mimeTypes[mimeType] || "file.svg"}`}
        width="50%"
        height="100%"
      />
    </NoPreviewDiv>
  );
};

export default function DocumentPage({ documentData }) {
  const { openModal, closeModal } = useModal();
  const { user } = useAuth();

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleBuy = async () => {
    user
      ? openModal(
          <PaymentModal>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <Payment documents={[documentData]} onSuccess={closeModal} />
          </PaymentModal>
        )
      : openModal(<AuthModal />);
  };

  const handleDownload = async () => {
    const { url } = await getDownloadUrl(
      user,
      documentData.subjectId,
      documentData.docId
    );

    const response = await fetch(url);
    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = href;
    element.download = documentData.fileName;
    element.click();
    element.remove();
    URL.revokeObjectURL(href);
  };

  useEffect(() => {
    if (documentData.preview) {
      const fileRef = ref(
        storage,
        `previews/${documentData.subjectId}/${documentData.docId}.pdf`
      );
      getDownloadURL(fileRef).then((url) => {
        setPreviewUrl(url);
      });
    }
  }, [documentData]);

  useEffect(() => {
    logEvent("view_item", {
      item: documentData.subjectId + "/" + documentData.docId,
    });
  }, [documentData]);

  return (
    <App>
      <DocumentDiv>
        <Title>
          <TitleText
            fontSize="4vw"
            fontWeight="bold"
            fontFamily="HelveticaRounded"
            color="secondary"
          >
            Documento
          </TitleText>
          <TitleImg src="/icons/document.svg" />
        </Title>
        <DocumentBody>
          {documentData.preview && previewUrl ? (
            <StyledPdf
              file={previewUrl}
              loading={<NoPreview mimeType={documentData.contentType} />}
            />
          ) : (
            // <Preview
            //   type="application/pdf"
            //   src={`${previewUrl}?#zoom=scale&scrollbar=0&toolbar=0&navpanes=0&view=Fit&pagemode=none`}
            // ></Preview>
            <NoPreview mimeType={documentData.contentType} />
          )}
          <DataGrid>
            <VerticalAlign>
              <Text color="secondary" fontSize="1.2rem" fontWeight="bold">
                Nombre del documento
              </Text>
              <DocumentTitle fontSize="1.5rem" margin="0.5rem 0 2rem 0">
                {documentData.name}
              </DocumentTitle>
              <Text color="secondary" fontSize="1.2rem" fontWeight="bold">
                Descripción
              </Text>
              <StyledDescription fontSize="1.2rem" margin="0.5rem 0 2rem 0">
                {documentData.description}
              </StyledDescription>
            </VerticalAlign>
            <VerticalAlign>
              <Text color="secondary" fontSize="1.2rem" fontWeight="bold">
                Usuario
              </Text>
              <Username
                fontSize="1.5rem"
                margin="0.5rem 0 2rem 0"
                color="primary"
                fontWeight="normal"
              >
                {documentData.createdBy}
              </Username>
              <Text color="secondary" fontSize="1.2rem" fontWeight="bold">
                Precio
              </Text>
              <Text
                fontSize="4rem"
                margin="0.5rem 0 2rem 0"
                title={
                  user?.data?.badge.includes("ambassador")
                    ? "Descuento embajador"
                    : "Precio"
                }
              >
                {currencyFormatter.format(
                  user?.data?.badge.includes("ambassador")
                    ? documentData.price * 0.8
                    : documentData.price
                )}
                <Span
                  fontSize="2rem"
                  margin="0 0 0 1rem"
                  color="secondary"
                  textDecoration="line-through"
                  title="Descuento de embajador"
                >
                  {user?.data?.badge.includes("ambassador") &&
                    currencyFormatter.format(documentData.price)}
                </Span>
              </Text>
              {user?.data?.bought?.includes(
                documentData.subjectId + "/" + documentData.docId
              ) ? (
                <Button
                  margin="0"
                  height="auto"
                  width="fit-content"
                  padding="0.5rem 1rem"
                  onClick={handleDownload}
                >
                  Descargar
                </Button>
              ) : (
                <Button
                  margin="0"
                  height="auto"
                  width="fit-content"
                  padding="0.5rem 1rem"
                  onClick={handleBuy}
                  disabled={documentData.createdById === user?.uid}
                >
                  Comprar
                </Button>
              )}
            </VerticalAlign>
          </DataGrid>
        </DocumentBody>
      </DocumentDiv>
    </App>
  );
}
