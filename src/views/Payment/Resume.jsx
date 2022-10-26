import styled from "styled-components";
import Button from "../../components/Button";
import Img from "../../components/Img";
import Text from "../../components/Text";
import { colors } from "../../config/theme";
import { currencyFormatter } from "../../util/normailize";

const ResumeDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Separator = styled.div`
  height: 2px;
  background-color: ${colors.hover};
`;

const DocumentCard = styled.div`
  display: grid;
  grid-template-columns: 3rem auto 10rem;
  gap: 1rem;
  padding: 10px;
  align-items: center;
`;

const VerticalText = styled.div`
  display: flex;
  flex-direction: column;
`;

const InlineContinue = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto 0 0 1rem;
  align-items: center;
`;

export default function Resume({ paymentDetails, setState }) {
  return (
    <ResumeDiv>
      <Text fontSize="2rem" fontWeight="bold" margin="0 0 1rem 0">
        Resumen de compra
      </Text>
      {paymentDetails.documents.map((document) => (
        <>
          <Separator />
          <DocumentCard>
            <Img
              src="/icons/document.svg"
              aspectRatio="61/75"
              width="100%"
              height="auto"
            />
            <VerticalText>
              <Text fontWeight="bold" fontSize="1.2rem">
                {document.name}
              </Text>
              <Text fontSize="0.8rem">{document.name}</Text>
            </VerticalText>
            <Text fontSize="2rem" textAlign="end">
              {currencyFormatter.format(document.price)}
            </Text>
          </DocumentCard>
        </>
      ))}
      <Separator />
      <Text textAlign="end" fontSize="2.5rem" margin="1rem 0 0 0">
        Total: {currencyFormatter.format(paymentDetails.totalAmount)}
      </Text>
      <InlineContinue>
        <Img
          src="/mangopay.png"
          aspectRatio="1345/152"
          height="1.2rem"
          width="fit-content"
        />
        <Button
          height="auto"
          padding="0.5rem 1rem"
          onClick={() => setState("card")}
        >
          Continuar
        </Button>
      </InlineContinue>
    </ResumeDiv>
  );
}
