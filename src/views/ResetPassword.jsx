import { confirmPasswordReset } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import App from "../components/App";
import Button from "../components/Button";
import Img from "../components/Img";
import Input from "../components/Input";
import Loading from "../components/Loading";
import Text from "../components/Text";
import { auth } from "../config/firebase";
import { colors, sizes } from "../config/theme";
import { useAuth } from "../context/authContext";

const ResetPasswordDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;

  width: min(30rem, 100%);
  margin: 0 auto;

  height: calc(100vh - ${sizes.navbar});
  justify-content: center;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: min(30rem, 100%);
  margin: 1rem auto 0 auto;
`;

const InlineText = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0 0 0;
`;

export default function ResetPassword({ valid, oobCode, email }) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState("reset");

  const [newPassword, setNewPassword] = useState({
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState({
    password: "",
    repeatPassword: "",
  });

  const handleChange = ({ target }) => {
    setNewPassword((newPassword) => ({
      ...newPassword,
      [target.name]: target.value,
    }));
  };

  const validatePassword = () => {
    let anyErrors = false;

    if (!newPassword.password.length) {
      setError((error) => ({
        ...error,
        password: "La contraseña es obligatoria",
      }));
      anyErrors = true;
    } else if (newPassword.password.length < 8) {
      setError((error) => ({
        ...error,
        password: "La contraseña debe tener al menos 8 caracteres",
      }));
      anyErrors = true;
    }

    if (!newPassword.repeatPassword.length) {
      setError((error) => ({
        ...error,
        repeatPassword: "Por favor repita la contraseña",
      }));
      anyErrors = true;
    } else if (newPassword.password !== newPassword.repeatPassword) {
      setError((error) => ({
        ...error,
        repeatPassword: "Las contraseñas no coinciden",
      }));
      anyErrors = true;
    }

    return anyErrors;
  };

  const handleSubmit = async () => {
    setError({
      password: "",
      repeatPassword: "",
    });
    const error = validatePassword();
    if (error) return;

    setIsLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword.password);
      await login(email, newPassword.password);

      setState("success");
      setIsLoading(false);
    } catch {
      setState("error");
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <App>
        <ResetPasswordDiv>
          <Loading />
        </ResetPasswordDiv>
      </App>
    );

  return (
    <App>
      {!valid ? (
        <ResetPasswordDiv>
          <Img src="/error.svg" height="8rem" priority />
          <Text
            fontSize="1.5rem"
            color="secondary"
            fontFamily="HelveticaRounded"
            fontWeigth="bold"
            textAlign="center"
            margin="1rem 0 0 0"
          >
            El enlace no es válido
          </Text>
          <Text textAlign="center">
            El enlace ha caducado o no es válido, revisa tu correo o solicita
            otro.
          </Text>
          <Link href="/" passHref>
            <Button
              height="auto"
              width="auto"
              margin="1rem auto 0 auto"
              padding="0.5rem 1rem"
              fontSize="1rem"
            >
              Volver al home
            </Button>
          </Link>
        </ResetPasswordDiv>
      ) : state === "reset" ? (
        <ResetPasswordDiv>
          <Img
            src="/logo.svg"
            height="5rem"
            width="5rem"
            margin="0 auto 1rem auto"
          />
          <Text fontSize="2rem" color="secondary" fontFamily="HelveticaRounded">
            Cambiar contraseña
          </Text>
          <InlineText>
            <Text>Contraseña</Text>
            {error.password && <Text color="secondary">{error.password}</Text>}
          </InlineText>
          <Input
            width="min(30rem, 100%)"
            margin="0 auto"
            value={newPassword.password}
            name="password"
            onChange={handleChange}
            type="password"
            border={
              error.password
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
          <InlineText>
            <Text>Repetir contraseña</Text>
            {error.repeatPassword && (
              <Text color="secondary">{error.repeatPassword}</Text>
            )}
          </InlineText>
          <Input
            width="min(30rem, 100%)"
            margin="0 auto"
            value={newPassword.repeatPassword}
            name="repeatPassword"
            onChange={handleChange}
            type="password"
            border={
              error.repeatPassword
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
          <ButtonDiv>
            <Button
              padding="0.5rem 1rem"
              margin="0"
              fontSize="1.2rem"
              background="secondary"
              onClick={handleSubmit}
            >
              Cambiar Contraseña
            </Button>
          </ButtonDiv>
        </ResetPasswordDiv>
      ) : state === "success" ? (
        <ResetPasswordDiv>
          <Img
            src="/check.svg"
            height="5rem"
            width="5rem"
            margin="0 auto 1rem auto"
          />
          <Text
            fontSize="2rem"
            color="secondary"
            fontFamily="HelveticaRounded"
            textAlign="center"
          >
            Contraseña cambiada
          </Text>
        </ResetPasswordDiv>
      ) : (
        <ResetPasswordDiv>
          <Img
            src="/error.svg"
            height="5rem"
            width="5rem"
            margin="0 auto 1rem auto"
          />
          <Text
            fontSize="2rem"
            color="secondary"
            fontFamily="HelveticaRounded"
            textAlign="center"
          >
            Error al cambiar la contraseña
          </Text>
        </ResetPasswordDiv>
      )}
    </App>
  );
}
