import styled from "styled-components";
import Input from "../Input";
import Text from "../Text";
import Button from "../Button";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useModal } from "../../context/modalContext";
import Welcome from "./Welcome";
import { addReferral, sendVerificationEmail } from "../../util/api";
import { colors } from "../../config/theme";

const Form = styled.form`
  text-align: center;
  width: 100%;
  padding: 0 5rem;

  @media (max-width: 600px) {
    padding: 0 10vw;
  }
`;

const Inline = styled.div`
  display: flex;
  gap: 1rem;
  margin: ${(params) => params.margin || "initial"};
`;

const Error = styled.p`
  color: ${colors.secondary};
  /* position: absolute; */
  bottom: 2rem;
  left: 0;
  right: 0;
`;

export default function RegisterForm() {
  const { register } = useAuth();
  const { closeModal, openModal } = useModal();

  const [form, setForm] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState({
    email: null,
    password: null,
    repeatPassword: null,
  });

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ email: null, password: null, repeatPassword: null });
    if (validateForm(form)) return;

    try {
      const { user } = await register(form.email, form.password);
      sendVerificationEmail(user);
      await closeModal();
      openModal(<Welcome />);

      const ref = localStorage.getItem("ref");
      if (ref) addReferral(user, ref);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setError((error) => ({ ...error, email: "El email ya está en uso" }));
      }
    }
  };

  const validateForm = (form) => {
    let anyErrors = false;
    if (!form.email.length) {
      setError((error) => ({ ...error, email: "El email es obligatorio" }));
      anyErrors = true;
    } else if (
      !form.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError((error) => ({ ...error, email: "El email no es válido" }));
      anyErrors = true;
    }

    if (!form.password.length) {
      setError((error) => ({
        ...error,
        password: "La contraseña es obligatoria",
      }));
      anyErrors = true;
    } else if (form.password.length < 8) {
      setError((error) => ({
        ...error,
        password: "La contraseña debe tener al menos 8 caracteres",
      }));
      anyErrors = true;
    }

    if (!form.repeatPassword.length) {
      setError((error) => ({
        ...error,
        repeatPassword: "Por favor repita la contraseña",
      }));
      anyErrors = true;
    } else if (form.password !== form.repeatPassword) {
      setError((error) => ({
        ...error,
        repeatPassword: "Las contraseñas no coinciden",
      }));
      anyErrors = true;
    }
    return anyErrors;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Inline margin="0 0 0.5rem 0">
        <Text>Correo electrónico</Text>
        {error.email && <Error>{error.email}</Error>}
      </Inline>
      <Input
        name="email"
        type="text"
        onChange={handleChange}
        border={
          error.email
            ? `2px solid ${colors.secondary}`
            : `2px solid ${colors.primary}`
        }
      />
      <Inline margin="2rem 0 0.5rem 0">
        <Text>Contraseña</Text>
        {error.password && <Error>{error.password}</Error>}
      </Inline>
      <Input
        name="password"
        type="password"
        onChange={handleChange}
        border={
          error.password
            ? `2px solid ${colors.secondary}`
            : `2px solid ${colors.primary}`
        }
      />
      <Inline margin="2rem 0 0.5rem 0">
        <Text>Repetir contraseña</Text>
        {error.repeatPassword && <Error>{error.repeatPassword}</Error>}
      </Inline>
      <Input
        name="repeatPassword"
        type="password"
        onChange={handleChange}
        border={
          error.repeatPassword
            ? `2px solid ${colors.secondary}`
            : `2px solid ${colors.primary}`
        }
      />

      <Button
        height="2.5rem"
        padding="0 2rem"
        background="secondary"
        margin="2rem 0 0 0"
      >
        Registrarse
      </Button>
    </Form>
  );
}
