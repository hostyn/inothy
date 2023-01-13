import { useEffect, useState } from "react";
import styled from "styled-components";
import Span from "../../components/Span";
import Img from "../../components/Img";
import Loading from "../../components/Loading";
import Text from "../../components/Text";
import { colors } from "../../config/theme";
import { useAuth } from "../../context/authContext";
import { buy, deleteCard, getCards } from "../../util/api";
import Button from "../../components/Button";
import { logEvent } from "../../config/firebase";

const CardDiv = styled.div`
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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
  }
`;

const CardCard = styled.div`
  display: grid;
  min-width: 100%;
  grid-template-columns: 3rem 1fr 1.5rem;
  gap: 1rem;
  border-radius: 10px;
  border: ${(props) =>
    props.selected
      ? `2px solid ${colors.secondary}`
      : `2px solid ${colors.primary}`};
  padding: 1rem;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;

  @media (max-width: 500px) {
    grid-template-columns: 2rem 1fr 1rem;
    gap: 0.5rem;
    padding: 1rem 0.7rem;
  }

  ${(props) =>
    props.selected &&
    `
    scale: 1.02;
  `}

  :hover {
    scale: 1.02;
  }
`;

const CardAlias = styled(Text)`
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const VerticalText = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddCardText = styled(Text)`
  grid-column: 2/4;

  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

export default function Card({
  setState,
  paymentDetails,
  setPaymentDetails,
  onSuccess,
}) {
  const { user, headers, updateData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);

  const handlePay = async () => {
    setState("loading");
    try {
      const res = await buy(
        user,
        paymentDetails.cardId,
        paymentDetails.documents,
        headers
      );

      if (res.status === "success") {
        setState("success");
        await new Promise((res) => setTimeout(res, 2000));
        await updateData();
        logEvent("purchase", {
          currency: "EUR",
          value: paymentDetails.totalAmount,
        });
        if (onSuccess) {
          onSuccess();
          return;
        }
        // TODO: END
      }

      if (res.status === "created") {
        location.href = res.redirectUrl;
      }
    } catch {
      setState("error");
    }
  };

  const handleDeleteCard = async (cardId) => {
    await deleteCard(user, cardId);
    const cards = await getCards(user);
    setCards(cards);
  };

  useEffect(() => {
    if (!isLoading) return;
    getCards(user).then((cards) => {
      setCards(cards);
      setIsLoading(false);
    });
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <CardDiv>
      <Title fontSize="2rem" fontWeight="bold" margin="0 0 1rem 0">
        Seleccione una tarjeta
      </Title>
      <CardGrid>
        {cards.map((card) => (
          <CardCard
            selected={paymentDetails.cardId === card.Id}
            key={card.Id}
            onClick={() =>
              setPaymentDetails((data) => ({ ...data, cardId: card.Id }))
            }
          >
            <Img src="/icons/card.svg" />
            <VerticalText>
              <CardAlias fontSize="1.3rem" userSelect="none">
                {card.Alias}
              </CardAlias>
              <Text userSelect="none">
                {card.ExpirationDate.substr(0, 2)}/
                {card.ExpirationDate.substr(2, 2)} |{" "}
                {card.CardProvider === "unknown"
                  ? "Desconocido"
                  : card.CardProvider}
              </Text>
            </VerticalText>
            <Img
              src="/icons/trash.svg"
              onClick={() => handleDeleteCard(card.Id)}
            />
          </CardCard>
        ))}
        <CardCard
          height="auto"
          margin="1rem auto"
          padding="0.5rem 1rem"
          onClick={() => setState("addCard")}
        >
          <Img src="/icons/card.svg" />
          <AddCardText display="flex" alignItems="center" fontSize="1.8rem">
            <Span fontSize="2.5rem">+ </Span>
            Añadir una tarjeta
          </AddCardText>
        </CardCard>
      </CardGrid>
      <Button
        margin="1rem auto"
        height="auto"
        padding="0.5rem 1rem"
        disabled={!paymentDetails.cardId}
        onClick={handlePay}
      >
        Pagar
      </Button>
    </CardDiv>
  );
}
