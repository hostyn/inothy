import { useState } from "react";
import styled from "styled-components";
import { colors } from "../../config/theme";
import { useModal } from "../../context/modalContext";
import { sendResetPasswordEmail } from "../../util/api";
import Button from "../Button";
import Input from "../Input";
import Text from "../Text";

const ForgetPasswordDiv = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 5rem;

  @media (max-width: 600px) {
    padding: 0 10vw;
  }
`;

export default function ForgetPassword({ setState }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleChange = ({ target }) => {
    setEmail(target.value);
  };

  const validateEmail = () => {
    if (!email.length) {
      setError("No puede estar vacío");
      return true;
    }

    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError("No es válido");
      return true;
    }

    return false;
  };

  const handleResetPassword = async () => {
    setError(null);
    const error = validateEmail();
    if (error) return;

    try {
      await sendResetPasswordEmail(email);
      setState("emailsent");
      await new Promise((res) => setTimeout(res, 2000));
      setState("login");
    } catch {
      setState("emailerror");
      await new Promise((res) => setTimeout(res, 2000));
      setState("login");
    }
  };

  return (
    <ForgetPasswordDiv>
      <Text
        fontSize="1.5rem"
        color="secondary"
        fontWeight="bold"
        textAlign="center"
      >
        ¿Has olvidado tu contraseña?
      </Text>
      <Text textAlign="center" width="80%" margin="0 auto 1rem auto">
        Escribe tu correo electrónico y te enviaremos un email para cambiar la
        contraseña
      </Text>
      <Input
        placeholder="Correo electrónico"
        value={email}
        onChange={handleChange}
        border={
          error
            ? `2px solid ${colors.secondary}`
            : `2px solid ${colors.primary}`
        }
      />
      <Button
        margin="1rem auto 0 auto"
        padding="0.5rem 1rem"
        background="secondary"
        onClick={handleResetPassword}
      >
        Enviar email
      </Button>
    </ForgetPasswordDiv>
  );
}
