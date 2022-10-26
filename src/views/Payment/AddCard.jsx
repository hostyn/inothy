import { useAuth } from "../../context/authContext";
import styled from "styled-components";
import { useState } from "react";
import Text from "../../components/Text";
import Input from "../../components/Input";
import Button from "../../components/Button";
import registerCard from "../../util/cardregistration";
import Loading from "../../components/Loading";
import { colors } from "../../config/theme";

const AddCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InlineText = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 1rem;
`;

export default function AddCard({ setState }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvx: "",
  });

  const handleChange = ({ target }) => {
    if (!target.value.match(/^\d*$/)) return;
    if (target.name === "cardNumber" && target.value.length > 18) return;
    if (target.name === "expirationMonth" && target.value > 12) return;
    if (target.name === "expirationYear" && target.value > 99) return;
    if (target.name === "cvx" && target.value > 999) return;

    setCardData((cardData) => ({ ...cardData, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("loading");
    try {
      await registerCard(
        user,
        cardData.cardNumber,
        `${("0" + cardData.expirationMonth).slice(-2)}${
          cardData.expirationYear
        }`,
        cardData.cvx
      );

      setState("cardSuccess");
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      setState("card");
    } catch {
      setState("cardError");
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      setState("card");
    }
  };

  return (
    <AddCardDiv>
      <Text fontSize="2rem" fontWeight="bold" margin="0 0 1rem 0">
        Añadir tarjeta
      </Text>
      <Form>
        <Text>Número de la tarjeta</Text>
        <Input
          margin="0 0 1rem 0"
          name="cardNumber"
          value={cardData.cardNumber}
          onChange={handleChange}
        />
        <InlineText>
          <Text>Fecha de caducidad</Text>
          <Text>CVV</Text>
          <InlineText>
            <Input
              placeholder="MM"
              name="expirationMonth"
              value={cardData.expirationMonth}
              onChange={handleChange}
            />
            <Input
              placeholder="AA"
              name="expirationYear"
              value={cardData.expirationYear}
              onChange={handleChange}
            />
          </InlineText>
          <Input
            placeholder="XXX"
            name="cvx"
            value={cardData.cvx}
            onChange={handleChange}
          />
        </InlineText>
        <InlineText>
          <Button
            height="auto"
            margin=" 1rem auto"
            padding="0.5rem 1rem"
            background="white"
            color="secondary"
            border={`2px solid ${colors.secondary}`}
            onClick={() => setState("card")}
          >
            Volver
          </Button>
          <Button
            height="auto"
            margin=" 1rem auto"
            padding="0.5rem 1rem"
            onClick={handleSubmit}
          >
            Añadir tarjeta
          </Button>
        </InlineText>
      </Form>
    </AddCardDiv>
  );
}
