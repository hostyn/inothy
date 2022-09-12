import styled from "styled-components";
import Input from "../Input";
import Text from "../Text";
import Button from "../Button";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useModal } from "../../context/modalContext";
import Welcome from "./Welcome";
import { sendVerificationEmail } from "../../util/api";

const Form = styled.form`
  text-align: center;
  width: 100%;
`;

const Error = styled.p`
  color: red;
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
`;

export default function RegisterForm() {
  const { register, logout } = useAuth();
  const { closeModal, openModal } = useModal();

  const [form, setForm] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (validateForm(form)) return;

    try {
      const { user } = await register(form.email, form.password);
      sendVerificationEmail(user);
      await closeModal();
      openModal(<Welcome />);
      // logout();
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setError("El email ya está en uso");
      }
    }
  };

  const validateForm = (form) => {
    if (!form.email.length) {
      setError("El email no pude estar vacío");
      return 1;
    }
    if (!form.password.length) {
      setError("La contraseña no puede estar vacía");
      return 1;
    }
    if (!form.repeatPassword.length) {
      setError("Porfavor repita la contraseña");
      return 1;
    }
    if (
      !form.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError("El email no es válido");
      return 1;
    }
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return 1;
    }
    if (form.password !== form.repeatPassword) {
      setError("Las contraseñas no coinciden");
      return 1;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Text margin="0 0 0.5rem 0">Correo electrónico</Text>
      <Input name="email" type="text" onChange={handleChange} />
      <Text margin="2rem 0 0.5rem 0">Contraseña</Text>
      <Input name="password" type="password" onChange={handleChange} />
      <Text margin="2rem 0 0.5rem 0">Repetir contraseña</Text>
      <Input name="repeatPassword" type="password" onChange={handleChange} />
      <Button
        height="2.5rem"
        padding="0 2rem"
        background="secondary"
        margin="2rem 0 0 0"
      >
        Registrarse
      </Button>
      {error && <Error>{error}</Error>}
    </Form>
  );
}
