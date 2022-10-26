import styled from "styled-components";
import App from "../components/App";
import Button from "../components/Button";
import Img from "../components/Img";
import Text from "../components/Text";
import { colors, sizes } from "../config/theme";
import { useModal } from "../context/modalContext";
import { currencyFormatter } from "../util/normailize";
import Payment from "./Payment/Payment";

const DocumentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem calc(${sizes.inlineMargin} * 2);
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DocumentBody = styled.div`
  margin: 1rem 0 0 0;
  display: grid;
  grid-template-columns: 20% repeat(2, 1fr);
  gap: 3rem;
`;

const Preview = styled.div`
  aspect-ratio: 1/1.41;
  border: 3px solid ${colors.primary};
  width: 100%;
`;

const VerticalAlign = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PaymentModal = styled.div`
  background-color: ${colors.white};
  display: grid;
  height: 70vh;
  width: 70vw;
  padding: 3rem;
  border-radius: 20px;
`;

export default function DocumentPage({ documentData }) {
  const { openModal } = useModal();

  const handleBuy = async () => {
    openModal(
      <PaymentModal>
        <Payment documents={[documentData]} />
      </PaymentModal>
    );
  };

  return (
    <App>
      <DocumentDiv>
        <Title>
          <Text
            fontSize="5rem"
            fontWeight="bold"
            fontFamily="HelveticaRounded"
            color="secondary"
          >
            Apunte
          </Text>
          <Img
            src="/icons/document.svg"
            height="10rem"
            aspectRatio="1"
            width="auto"
          />
        </Title>
        <DocumentBody>
          <Preview></Preview>
          <VerticalAlign>
            <Text color="secondary" fontSize="1.2rem">
              Nombre del documento
            </Text>
            <Text fontSize="2rem" margin="0.5rem 0 2rem 0">
              {documentData.name}
            </Text>
            <Text color="secondary" fontSize="1.2rem">
              Descripción
            </Text>
            <Text fontSize="1.2rem" margin="0.5rem 0 2rem 0">
              {documentData.description}
            </Text>
          </VerticalAlign>
          <VerticalAlign>
            <Text color="secondary" fontSize="1.2rem">
              Usuario
            </Text>
            <Text fontSize="2rem" margin="0.5rem 0 2rem 0">
              {documentData.createdBy}
            </Text>
            <Text color="secondary" fontSize="1.2rem">
              Precio
            </Text>
            <Text fontSize="4rem" margin="0.5rem 0 2rem 0">
              {currencyFormatter.format(documentData.price)}
            </Text>
            <Button
              margin="0"
              height="auto"
              width="fit-content"
              padding="0.5rem 1rem"
              onClick={handleBuy}
            >
              Comprar
            </Button>
          </VerticalAlign>
        </DocumentBody>
      </DocumentDiv>
    </App>
  );
}
