import Text from "../../components/Text";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styled from "styled-components";
import { useState } from "react";
import { colors } from "../../config/theme";
import { isUsernameAvailable } from "../../util/api";
import ButtonGrid from "./components/ButtonGrid";

const InlineInput = styled.div`
  display: grid;
  grid-template-columns: 47.5% 47.5%;
  gap: 0 5%;
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
`;

const Error = styled.p`
  color: ${colors.secondary};
  text-align: center;
`;

export default function State1PersonalData({
  userData,
  setUserData,
  setState,
}) {
  const [data, setData] = useState({
    name: userData.name,
    surname: userData.surname,
    username: userData.username,
    address1: userData.address1,
    address2: userData.address2,
    city: userData.city,
    region: userData.region,
    postalCode: userData.postalCode,
  });

  const [error, setError] = useState({
    name: null,
    surname: null,
    username: null,
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
      setError((error) => ({ ...error, name: "No puede estar vacío" }));
      anyError = true;
    } else if (
      !data.name.match(/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/)
    ) {
      setError((error) => ({ ...error, name: "No es válido" }));
      anyError = true;
    }
    // SURNAME
    if (data.surname.length === 0) {
      setError((error) => ({ ...error, surname: "No puede estar vacío" }));
      anyError = true;
    } else if (
      !data.surname.match(/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/)
    ) {
      setError((error) => ({ ...error, surname: "No es válido" }));
      anyError = true;
    }
    // USERNAME
    if (data.username.length === 0) {
      setError((error) => ({ ...error, username: "No puede estar vacío" }));
      anyError = true;
    } else if (
      !data.username.match(
        /^(?=.{4,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
      )
    ) {
      setError((error) => ({ ...error, username: "No es válido" }));
      anyError = true;
    } else if (!(await isUsernameAvailable(data.username))) {
      setError((error) => ({ ...error, username: "Ya está en uso" }));
      anyError = true;
    } // Falta tamaño mínimo y carácteres
    // Address
    if (data.address1.length === 0) {
      setError((error) => ({ ...error, address1: "No puede estar vacía" }));
      anyError = true;
    }
    if (data.city.length === 0) {
      setError((error) => ({ ...error, city: "No puede estar vacía" }));
      anyError = true;
    }
    if (data.postalCode.length === 0) {
      setError((error) => ({ ...error, postalCode: "No puede estar vacío" }));
      anyError = true;
    }
    if (data.region.length === 0) {
      setError((error) => ({ ...error, region: "No puede estar vacía" }));
      anyError = true;
    }

    return anyError;
  };

  const handleSubmit = async () => {
    setError({
      name: null,
      surname: null,
      username: null,
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
      <Text
        fontSize="3rem"
        fontWeight="bold"
        fontFamily="HelveticaRounded"
        textAlign="center"
      >
        Información Personal
      </Text>
      <Form>
        <Title>
          <Text fontWeight="bold">Nombre</Text>
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
        <Title margin="1rem 0 0 0">
          <Text fontWeight="bold">Apellidos</Text>
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
        <Title margin="1rem 0 0 0">
          <Text fontWeight="bold">Nombre de usuario</Text>
          {error.username && <Error>{error.username}</Error>}
        </Title>
        <Input
          name="username"
          value={data.username}
          onChange={handleChange}
          border={
            error.username
              ? `2px solid ${colors.secondary}`
              : `2px solid ${colors.primary}`
          }
        />
        <InlineInput>
          <Title margin="1rem 0 0 0">
            <Text fontWeight="bold">Dirección 1</Text>
            {error.address1 && <Error>{error.address1}</Error>}
          </Title>
          <Text fontWeight="bold" margin="1rem 0 0 0">
            Dirección 2
          </Text>
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
          <Input
            name="address2"
            value={data.address2}
            onChange={handleChange}
          />
          <Title margin="1rem 0 0 0">
            <Text fontWeight="bold">Ciudad</Text>
            {error.city && <Error>{error.city}</Error>}
          </Title>
          <Title margin="1rem 0 0 0">
            <Text fontWeight="bold">Código postal</Text>
            {error.postalCode && <Error>{error.postalCode}</Error>}
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

          <Title margin="1rem 0 0 0">
            <Text fontWeight="bold">Provincia</Text>
            {error.region && <Error>{error.region}</Error>}
          </Title>
          <Text fontWeight="bold" margin="1rem 0 0 0">
            País
          </Text>
          <Input
            margin="0 0 1rem 0"
            name="region"
            value={data.region}
            onChange={handleChange}
            border={
              error.region
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
          <Input disabled value="España" margin="0 0 1rem 0" />
        </InlineInput>
      </Form>
      <ButtonGrid>
        <Button onClick={handleSubmit} gridColumn="2">
          Siguiente
        </Button>
      </ButtonGrid>
    </Body>
  );
}
