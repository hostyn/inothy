import styled from 'styled-components'
import { useState } from 'react'
import { useAuth } from '@context/authContext'
import { useModal } from '@context/modalContext'
import { A, Button, Input, Text } from '@ui'

const Form = styled.form`
  display: flex;
  flex-direction: column;

  text-align: center;
  width: 100%;
  padding: 0 5rem;

  @media (max-width: 600px) {
    padding: 0 10vw;
  }
`

const Error = styled.p`
  margin: 0 0 0 1rem;
  color: red;
  bottom: 4rem;
  left: 0;
  right: 0;
`

const InlineText = styled.div`
  display: flex;
  margin: ${(props) => props.margin || 'initial'};
`

export default function LoginForm ({ setState }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState({
    email: null,
    password: null
  })

  const { login } = useAuth()
  const { closeModal } = useModal()

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError({
      email: null,
      password: null
    })
    if (validateForm(form)) return

    login(form.email, form.password)
      .then((res) => closeModal())
      .catch((error) => {
        setError((error) => ({ email: 'Email o contraseña inválidos' }))
      })
  }

  const handleForgetPassword = () => {
    setState('forgetPassword')
  }

  const validateForm = (form) => {
    let anyError = false
    if (!form.email.length) {
      setError((error) => ({
        ...error,
        email: 'No puede estar vacío'
      }))
      anyError = true
    } else if (
      !form.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError((error) => ({ email: 'No es válido' }))
      anyError = true
    }

    if (!form.password.length) {
      setError((error) => ({
        ...error,
        password: 'No puede estar vacía'
      }))
      anyError = true
    }
    return anyError
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InlineText>
        <Text margin="0 0 0.5rem 0">Correo electrónico</Text>
        {error.email && <Error>{error.email}</Error>}
      </InlineText>
      <Input name="email" type="text" onChange={handleChange} />
      <InlineText margin="2rem 0 0.5rem 0">
        <Text>Contraseña</Text>
        {error.password && <Error>{error.password}</Error>}
      </InlineText>
      <Input name="password" type="password" onChange={handleChange} />
      <A
        color="primary"
        fontSize="1rem"
        textAlign="center"
        margin="1rem 0 0 0"
        onClick={handleForgetPassword}
      >
        ¿Has olvidado tu contraseña?
      </A>
      <Button
        height="auto"
        padding="0.5rem 2rem"
        background="secondary"
        margin="1rem auto 0 auto"
      >
        Iniciar sesión
      </Button>
    </Form>
  )
}
