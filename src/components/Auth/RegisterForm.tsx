import styled from 'styled-components'
import Welcome from './Welcome'
import { useAuth } from '@context/authContext'
import { useModal } from '@context/modalContext'
import { Button, Input } from '@ui'
import { useForm } from 'react-hook-form'

const Form = styled.form`
  text-align: center;
  width: 100%;
  padding: 0 5rem;

  @media (max-width: 600px) {
    padding: 0 10vw;
  }
`

interface FormValues {
  email: string
  password: string
  repeatPassword: string
}

export default function RegisterForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
    setError,
  } = useForm<FormValues>({ mode: 'onBlur', reValidateMode: 'onBlur' })

  const { register: registerUser } = useAuth()
  const { closeModal, openModal } = useModal()

  const onSubmit = async ({ email, password }: FormValues): Promise<void> => {
    try {
      await registerUser(email, password)
      await closeModal()
      openModal(<Welcome />)
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError(
          'email',
          { message: 'El email ya está en uso.' },
          { shouldFocus: true }
        )
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email', {
          required: 'El email es obligatorio.',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'El email no es válido.',
          },
          onChange: () => {
            clearErrors('email')
          },
        })}
        type="text"
        error={errors.email}
        placeholder="Correo Electrónico"
      />
      <Input
        {...register('password', {
          required: 'La contraseña es obligatoria.',
          minLength: {
            value: 8,
            message: 'La contraseña debe tener 8 caracteres como mínimo.',
          },
          onChange: () => {
            clearErrors('password')
          },
        })}
        type="password"
        error={errors.password}
        placeholder="Contraseña"
      />
      <Input
        {...register('repeatPassword', {
          required: 'Debes repetir la contraseña.',
          validate: (value: string) => {
            if (watch('password') !== value)
              return 'Las contraseñas no coinciden'
          },
          onChange: () => {
            clearErrors('email')
          },
        })}
        type="password"
        error={errors.repeatPassword}
        placeholder="Repetir contraseña"
      />

      <Button
        height="2.5rem"
        padding="0 2rem"
        background="secondary"
        margin="10px 0 0 0"
      >
        Registrarse
      </Button>
    </Form>
  )
}
