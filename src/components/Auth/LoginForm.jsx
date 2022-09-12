import styled from "styled-components";
import Input from "../Input";
import Text from "../Text";
import Button from "../Button";
import { useState } from "react";
import { useModal } from "../../context/modalContext";
import { useAuth } from "../../context/authContext";

const Form = styled.form`
  text-align: center;
  width: 100%;
`;

const Error = styled.p`
  color: red;
  position: absolute;
  bottom: 4rem;
  left: 0;
  right: 0;
`;

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { login } = useAuth();
  const { closeModal } = useModal();

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (validateForm(form)) return;

    login(form.email, form.password)
      .then((res) => closeModal())
      .catch((error) => {
        setError("Email o contraseña inválidos");
      });
  };

  const validateForm = (form) => {
    if (!form.email.length) {
      setError("El email no puede estar vacío");
      return 1;
    }
    if (!form.password.length) {
      setError("La contraseña no puede estar vacía");
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
    return 0;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Text margin="0 0 0.5rem 0">Correo electrónico</Text>
      <Input name="email" type="text" onChange={handleChange} />
      <Text margin="2rem 0 0.5rem 0">Contraseña</Text>
      <Input name="password" type="password" onChange={handleChange} />
      <Button
        height="2.5rem"
        padding="0 2rem"
        background="secondary"
        margin="2rem 0 0 0"
      >
        Iniciar sesión
      </Button>
      {error && <Error>{error}</Error>}
    </Form>
  );
}
