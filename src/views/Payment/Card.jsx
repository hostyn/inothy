import { useEffect, useState } from "react";
import styled from "styled-components";
import Span from "../../components/Span";
import Img from "../../components/Img";
import Loading from "../../components/Loading";
import Text from "../../components/Text";
import { colors } from "../../config/theme";
import { useAuth } from "../../context/authContext";
import { buy, getCards } from "../../util/api";
import Button from "../../components/Button";

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const CardCard = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 1rem;
  border-radius: 10px;
  border: ${(props) =>
    props.selected
      ? `3px solid ${colors.secondary}`
      : `3px solid ${colors.primary}`};
  padding: 1rem;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;

  ${(props) =>
    props.selected &&
    `
    scale: 1.03;
  `}

  :hover {
    scale: 1.03;
  }
`;

const VerticalText = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Card({ setState, paymentDetails, setPaymentDetails }) {
  const { user, headers } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);

  const handlePay = async () => {
    const res = await buy(
      user,
      paymentDetails.cardId,
      paymentDetails.documents,
      headers
    );
    console.log(res);
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
      <Text fontSize="2rem" fontWeight="bold" margin="0 0 1rem 0">
        Seleccione una tarjeta
      </Text>
      <CardGrid>
        {cards.map((card) => (
          <CardCard
            selected={paymentDetails.cardId === card.Id}
            key={card.Id}
            onClick={() =>
              setPaymentDetails((data) => ({ ...data, cardId: card.Id }))
            }
          >
            <Img src="/icons/card.svg" aspectRatio="39/25" />
            <VerticalText>
              <Text fontSize="1.5rem">{card.Alias}</Text>
              <Text>
                {card.ExpirationDate.substr(0, 2)}/
                {card.ExpirationDate.substr(2, 2)} | {card.CardProvider}
              </Text>
            </VerticalText>
          </CardCard>
        ))}
        <CardCard
          height="auto"
          margin="1rem auto"
          padding="0.5rem 1rem"
          onClick={() => setState("addCard")}
        >
          <Img src="/icons/card.svg" aspectRatio="39/25" />
          <Text display="flex" alignItems="center" fontSize="2rem">
            <Span fontSize="3rem">+ </Span>
            Añadir una tarjeta
          </Text>
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
