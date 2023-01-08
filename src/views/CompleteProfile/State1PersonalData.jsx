import Text from "../../components/Text";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styled from "styled-components";
import { useState } from "react";
import { colors } from "../../config/theme";
import ButtonGrid, { StyledButton } from "./components/ButtonGrid";
import HeaderTitle from "./components/Title";

const InlineInput = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.div`
  display: flex;
  gap: 1rem;
  margin: ${(props) => props.margin || "initial"};
`;

const Body = styled.div`
  min-height: 100%;
  max-height: 100%;
  min-width: 100%;
  max-width: 100%;

  display: grid;
  grid-template-rows: min-content auto 3rem;
`;

const Form = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 1rem;
`;

const Error = styled.p`
  color: ${colors.secondary};
  text-align: center;
`;

const VerticalDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

export default function State1PersonalData({
  userData,
  setUserData,
  setState,
}) {
  const [data, setData] = useState({
    name: userData.name,
    surname: userData.surname,
    address1: userData.address1,
    address2: userData.address2,
    city: userData.city,
    region: userData.region,
    postalCode: userData.postalCode,
  });

  const [error, setError] = useState({
    name: null,
    surname: null,
    address1: null,
    address2: null,
    city: null,
    region: null,
    postalCode: null,
  });

  const handleChange = ({ target }) => {
    setData((data) => ({ ...data, [target.name]: target.value }));
  };

  const verifyData = async () => {
    let anyError = false;
    // NAME
    if (data.name.length === 0) {
      setError((error) => ({ ...error, name: "Obligatorio" }));
      anyError = true;
    } else if (
      !data.name.match(/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/)
    ) {
      setError((error) => ({ ...error, name: "No es válido" }));
      anyError = true;
    }

    // SURNAME
    if (data.surname.length === 0) {
      setError((error) => ({ ...error, surname: "Obligatorio" }));
      anyError = true;
    } else if (
      !data.surname.match(/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/)
    ) {
      setError((error) => ({ ...error, surname: "No es válido" }));
      anyError = true;
    }

    // Address
    if (data.address1.length === 0) {
      setError((error) => ({ ...error, address1: "Obligatorio" }));
      anyError = true;
    }
    if (data.city.length === 0) {
      setError((error) => ({ ...error, city: "Obligatorio" }));
      anyError = true;
    }
    if (data.postalCode.length === 0) {
      setError((error) => ({ ...error, postalCode: "Obligatorio" }));
      anyError = true;
    }
    if (data.region.length === 0) {
      setError((error) => ({ ...error, region: "Obligatorio" }));
      anyError = true;
    }

    return anyError;
  };

  const handleSubmit = async () => {
    setError({
      name: null,
      surname: null,
      address1: null,
      address2: null,
      city: null,
      region: null,
      postalCode: null,
    });

    const error = await verifyData();
    if (error) return;

    setUserData((userData) => ({
      ...userData,
      ...data,
      personalDataCompleted: true,
    }));
    setState("university");
  };

  return (
    <Body>
      <HeaderTitle>Información Personal</HeaderTitle>
      <Form>
        <VerticalDiv>
          <Title>
            <Text fontWeight="bold" minWidth="max-content">
              Nombre
            </Text>
            {error.name && <Error>{error.name}</Error>}
          </Title>
          <Input
            name="name"
            value={data.name}
            onChange={handleChange}
            border={
              error.name
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
        </VerticalDiv>
        <VerticalDiv>
          <Title>
            <Text fontWeight="bold" minWidth="max-content">
              Apellidos
            </Text>
            {error.surname && <Error>{error.surname}</Error>}
          </Title>
          <Input
            name="surname"
            value={data.surname}
            onChange={handleChange}
            border={
              error.surname
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
        </VerticalDiv>

        <InlineInput>
          <VerticalDiv>
            <Title>
              <Text fontWeight="bold" minWidth="max-content">
                Dirección 1
              </Text>
              {error.address1 && <Error>{error.address1}</Error>}
            </Title>
            <Input
              name="address1"
              value={data.address1}
              onChange={handleChange}
              border={
                error.address1
                  ? `2px solid ${colors.secondary}`
                  : `2px solid ${colors.primary}`
              }
            />
          </VerticalDiv>
          <VerticalDiv>
            <Text fontWeight="bold" minWidth="max-content">
              Dirección 2
            </Text>

            <Input
              name="address2"
              value={data.address2}
              onChange={handleChange}
            />
          </VerticalDiv>

          <VerticalDiv>
            <Title>
              <Text fontWeight="bold" minWidth="max-content">
                Ciudad
              </Text>
              {error.city && <Error>{error.city}</Error>}
            </Title>
            <Input
              name="city"
              value={data.city}
              onChange={handleChange}
              border={
                error.city
                  ? `2px solid ${colors.secondary}`
                  : `2px solid ${colors.primary}`
              }
            />
          </VerticalDiv>

          <VerticalDiv>
            <Title>
              <Text fontWeight="bold" minWidth="max-content">
                Código postal
              </Text>
              {error.postalCode && <Error>{error.postalCode}</Error>}
            </Title>

            <Input
              name="postalCode"
              value={data.postalCode}
              onChange={handleChange}
              border={
                error.postalCode
                  ? `2px solid ${colors.secondary}`
                  : `2px solid ${colors.primary}`
              }
            />
          </VerticalDiv>

          <VerticalDiv>
            <Title>
              <Text fontWeight="bold" minWidth="max-content">
                Provincia
              </Text>
              {error.region && <Error>{error.region}</Error>}
            </Title>
            <Input
              name="region"
              value={data.region}
              onChange={handleChange}
              border={
                error.region
                  ? `2px solid ${colors.secondary}`
                  : `2px solid ${colors.primary}`
              }
            />
          </VerticalDiv>

          <VerticalDiv>
            <Text fontWeight="bold" minWidth="max-content">
              País
            </Text>
            <Input disabled value="España" />
          </VerticalDiv>
        </InlineInput>
      </Form>
      <ButtonGrid>
        <StyledButton onClick={() => setState("completeProfile")} back>
          Atrás
        </StyledButton>
        <StyledButton onClick={handleSubmit} gridColumn="2">
          Siguiente
        </StyledButton>
      </ButtonGrid>
    </Body>
  );
}
