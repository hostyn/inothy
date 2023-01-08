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

const Title = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Separator = styled.div`
  height: 2px;
  background-color: ${colors.hover};
`;

const DocumentCard = styled.div`
  display: grid;
  grid-template-columns: 3rem auto min-content;
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

const DoucumentName = styled(Text)`
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DocumentPrice = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TotalText = styled(Text)`
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PoweredByMangopay = styled(Img)`
  height: 1.2rem;
  width: calc(1.2rem * 1345 / 152);

  @media (max-width: 768px) {
    height: 1rem;
    width: calc(1rem * 1345 / 152);
  }
`;

const StyledButton = styled(Button)`
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default function Resume({ paymentDetails, setState }) {
  return (
    <ResumeDiv>
      <Title fontSize="2rem" fontWeight="bold" margin="0 0 1rem 0">
        Resumen de compra
      </Title>
      {paymentDetails.documents.map((document) => (
        <div key={document.docId}>
          <Separator />
          <DocumentCard>
            <Img src="/icons/document.svg" />
            <VerticalText>
              <DoucumentName fontWeight="bold" fontSize="1.2rem">
                {document.name}
              </DoucumentName>
              <Text fontSize="0.8rem">{document.createdBy}</Text>
            </VerticalText>
            <DocumentPrice fontSize="2rem" textAlign="end">
              {currencyFormatter.format(document.price)}
            </DocumentPrice>
          </DocumentCard>
        </div>
      ))}
      <Separator />
      <TotalText textAlign="end" fontSize="2.5rem" margin="1rem 0 0 0">
        Total: {currencyFormatter.format(paymentDetails.totalAmount)}
      </TotalText>
      <InlineContinue>
        <PoweredByMangopay src="/mangopay.png" />
        <StyledButton
          height="auto"
          padding="0.5rem 1rem"
          margin="0"
          onClick={() => setState("card")}
        >
          Continuar
        </StyledButton>
      </InlineContinue>
    </ResumeDiv>
  );
}
