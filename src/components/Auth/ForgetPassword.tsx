import { Button, Input, Text } from '@ui'
import { sendResetPasswordEmail } from '@util/api'
import Form from './components/Form'
import { useForm } from 'react-hook-form'
import type { ModalState } from './AuthModal'

interface ForgetPasswordProps {
  setState: (state: ModalState) => any
}

interface FormValues {
  email: string
}

export default function ForgetPassword({
  setState,
}: ForgetPasswordProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<FormValues>({ mode: 'onBlur', reValidateMode: 'onBlur' })

  const onSubmit = async ({ email }: FormValues): Promise<void> => {
    try {
      await sendResetPasswordEmail(email)
      setState('emailSent')
      await new Promise(resolve => setTimeout(resolve, 5000))
      setState('login')
    } catch (error) {
      console.log(error)
      if (error.message === 'auth/email-not-found') {
        setError(
          'email',
          {
            message: 'Email no encontrado',
          },
          {
            shouldFocus: true,
          }
        )
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Text
        fontSize="1.5rem"
        color="secondary"
        fontWeight="bold"
        textAlign="center"
      >
        ¿Has olvidado tu contraseña?
      </Text>
      <Text textAlign="center" margin="0 auto 1rem auto">
        Escribe tu correo electrónico y te enviaremos un email para cambiar la
        contraseña
      </Text>
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
      <Button margin="1rem auto 0 auto">Enviar email</Button>
    </Form>
  )
}
