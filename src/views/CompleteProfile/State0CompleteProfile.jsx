import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Text from "../../components/Text";
import { colors } from "../../config/theme";
import ButtonGrid, { StyledButton } from "./components/ButtonGrid";
import Textarea from "../../components/Textarea";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { isUsernameAvailable } from "../../util/api";
import HeaderTitle from "./components/Title";

const Body = styled.div`
  min-height: 100%;
  max-height: 100%;
  min-width: 100%;
  max-width: 100%;

  display: grid;
  grid-template-rows: min-content 1fr 3rem;
`;

const Form = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Title = styled.div`
  display: flex;
  gap: 1rem;
  margin: ${(props) => props.margin || "initial"};
`;

const Error = styled.p`
  color: ${colors.secondary};
  text-align: center;
`;

export default function State0CompleteProfile({
  userData,
  setUserData,
  setState,
}) {
  const { user } = useAuth();

  const [data, setData] = useState({
    username: userData.username,
    biography: userData.biography,
  });

  const [error, setError] = useState({
    username: null,
    biography: null,
  });

  const handleChange = ({ target }) => {
    setData((data) => ({ ...data, [target.name]: target.value }));
  };

  const verifyData = async () => {
    let anyError = false;

    if (data.username.length === 0) {
      setError((error) => ({ ...error, username: "No puede estar vacío" }));
      anyError = true;
    } else if (!data.username.match(/^[a-zA-Z][a-zA-Z\d_\-\.]{3,29}$/)) {
      setError((error) => ({ ...error, username: "No es válido" }));
      anyError = true;
    } else if (
      data.username !== user.data.username &&
      !(await isUsernameAvailable(data.username))
    ) {
      setError((error) => ({ ...error, username: "No está disponible" }));
      anyError = true;
    }

    if (data.biography.length === 0) {
      setError((error) => ({ ...error, biography: "Es obligatoria" }));
      anyError = true;
    } else if (data.biography.length < 20) {
      setError((error) => ({
        ...error,
        biography: "Debe tener al menos 20 caracteres",
      }));
      anyError = true;
    }

    return anyError;
  };

  const handleSubmit = async () => {
    setError({ username: null, biography: null });
    const error = await verifyData();
    if (error) return;

    setState("loading");

    setUserData((userData) => ({
      ...userData,
      ...data,
      completeProfileCompleted: true,
    }));

    setState("personalData");

    // Submit
  };

  return (
    <Body>
      <HeaderTitle>Perfil</HeaderTitle>
      <Form>
        <Title>
          <Text fontWeight="bold">Nombre de usuario</Text>
          {error.username && <Error>{error.username}</Error>}
        </Title>
        <Input
          name="username"
          margin="0 0 1rem 0"
          value={data.username}
          onChange={handleChange}
          border={
            error.username
              ? `2px solid ${colors.secondary}`
              : `2px solid ${colors.primary}`
          }
        />

        <Title>
          <Text fontWeight="bold">Biografía</Text>
          {error.biography && <Error>{error.biography}</Error>}
        </Title>
        <Textarea
          name="biography"
          value={data.biography}
          onChange={handleChange}
          rows="5"
          margin="0 0 1rem 0"
          border={
            error.biography
              ? `2px solid ${colors.secondary}`
              : `2px solid ${colors.primary}`
          }
        />
      </Form>

      <ButtonGrid>
        <StyledButton onClick={handleSubmit} gridColumn="2">
          Siguiente
        </StyledButton>
      </ButtonGrid>
    </Body>
  );
}
