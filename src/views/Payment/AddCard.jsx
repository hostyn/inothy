import { useAuth } from "../../context/authContext";
import styled from "styled-components";
import { useState } from "react";
import Text from "../../components/Text";
import Input from "../../components/Input";
import Button from "../../components/Button";
import registerCard from "../../util/cardregistration";
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

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 1rem;
`;

const InlineError = styled.div`
  display: flex;
  gap: 1rem;
  grid-column: ${(props) => props.column ?? "auto"};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 0 0;

  @media (max-width: 768px) {
    & button {
      font-size: 1rem;
    }
  }
`;

export default function AddCard({ setState }) {
  const { user } = useAuth();
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvx: "",
  });

  const [error, setError] = useState({
    cardNumber: null,
    date: null,
    cvx: null,
  });

  const handleChange = ({ target }) => {
    if (!target.value.match(/^[\d\ ]*$/)) return;
    if (
      target.name === "cardNumber" &&
      target.value.replaceAll(" ", "").length > 18
    )
      return;
    if (target.name === "expirationMonth" && target.value > 12) return;
    if (target.name === "expirationYear" && target.value > 99) return;
    if (target.name === "cvx" && target.value > 999) return;

    setCardData((cardData) => ({
      ...cardData,
      [target.name]: target.value.replaceAll(" ", ""),
    }));
  };

  const validateData = () => {
    let anyError = false;

    if (!cardData.cardNumber.length) {
      setError((error) => ({ ...error, cardNumber: "No puede estar vacío" }));
      anyError = true;
    } else if (
      cardData.cardNumber.length < 13 ||
      cardData.cardNumber.length > 18
    ) {
      setError((error) => ({ ...error, cardNumber: "Formato no válido" }));
      anyError = true;
    }

    if (!cardData.expirationMonth) {
      setError((error) => ({
        ...error,
        date: "Fecha inválida",
      }));
      anyError = true;
    }

    if (!cardData.expirationYear) {
      setError((error) => ({
        ...error,
        date: "Fecha inválida",
      }));
      anyError = true;
    } else if (cardData.expirationYear.length != 2) {
      setError((error) => ({
        ...error,
        date: "Fecha inválida",
      }));
      anyError = true;
    }

    if (!cardData.cvx) {
      setError((error) => ({
        ...error,
        cvx: "No puede estar vacío",
      }));
      anyError = true;
    } else if (cardData.cvx.length !== 3) {
      setError((error) => ({
        ...error,
        cvx: "Debe tener 3 números",
      }));
      anyError = true;
    }

    return anyError;
  };

  const handleSubmit = async () => {
    setError({
      cardNumber: null,
      date: null,
      cvx: null,
    });
    const error = validateData();
    if (error) return;

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
        <InlineError>
          <Text>Número de la tarjeta</Text>
          <Text color="secondary">{error.cardNumber}</Text>
        </InlineError>
        <Input
          margin="0 0 1rem 0"
          name="cardNumber"
          placeholder="XXXX XXXX XXXX XXXX"
          value={cardData.cardNumber}
          onChange={handleChange}
          border={
            error.cardNumber
              ? `2px solid ${colors.secondary}`
              : `2px solid ${colors.primary}`
          }
        />
        <InputGrid>
          <InlineError column="1/3">
            <Text>Fecha de caducidad</Text>
            <Text color="secondary">{error.date}</Text>
          </InlineError>
          <InlineError>
            <Text>CVV</Text>
            <Text color="secondary">{error.cvx}</Text>
          </InlineError>
          <Input
            placeholder="MM"
            name="expirationMonth"
            value={cardData.expirationMonth}
            onChange={handleChange}
            border={
              error.date
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
          <Input
            placeholder="AA"
            name="expirationYear"
            value={cardData.expirationYear}
            onChange={handleChange}
            border={
              error.date
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
          <Input
            placeholder="XXX"
            name="cvx"
            value={cardData.cvx}
            onChange={handleChange}
            border={
              error.cvx
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
        </InputGrid>
        <ButtonsDiv>
          <Button
            height="auto"
            margin="0"
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
            margin="0 0 0 auto"
            padding="0.5rem 1rem"
            onClick={handleSubmit}
          >
            Añadir tarjeta
          </Button>
        </ButtonsDiv>
      </Form>
    </AddCardDiv>
  );
}
