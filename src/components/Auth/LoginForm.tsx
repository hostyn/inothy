import { A, Button, Input } from '@ui'
import { useAuth } from '@context/authContext'
import { useModal } from '@context/modalContext'
import { type ModalState } from './AuthModal'
import { useForm } from 'react-hook-form'
import Form from './components/Form'

interface LoginFormProps {
  setState: (state: ModalState) => any
}

interface FormValues {
  email: string
  password: string
}

export default function LoginForm({ setState }: LoginFormProps): JSX.Element {
  const { login } = useAuth()
  const { closeModal } = useModal()

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<FormValues>({ mode: 'onBlur', reValidateMode: 'onBlur' })

  const handleForgetPassword = (): void => {
    setState('forgetPassword')
  }

  const onSubmit = async ({ email, password }: FormValues): Promise<void> => {
    try {
      await login(email, password)
      await closeModal()
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setError(
          'password',
          {
            message: 'Contraseña incorrecta.',
          },
          { shouldFocus: true }
        )
        return
      }

      if (error.code === 'auth/user-not-found') {
        setError(
          'email',
          {
            message: 'Usuario no encontrado.',
          },
          { shouldFocus: true }
        )
        return
      }

      if (error.code === 'auth/too-many-requests') {
        setError(
          'email',
          {
            message: 'Demasiados intentos, espera unos segundos.',
          },
          { shouldFocus: true }
        )
        return
      }

      setError(
        'email',
        {
          message: 'Error, vuelve a intentalo mas tarde.',
        },
        { shouldFocus: true }
      )
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
          onChange: () => {
            clearErrors('password')
          },
        })}
        type="password"
        error={errors.password}
        placeholder="Contraseña"
      />
      <A
        color="primary"
        fontSize="1rem"
        textAlign="center"
        margin="5px auto 0 auto"
        onClick={handleForgetPassword}
      >
        ¿Has olvidado tu contraseña?
      </A>
      <Button margin="10px auto 0 auto">Iniciar sesión</Button>
    </Form>
  )
}
