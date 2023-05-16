import { confirmPasswordReset } from 'firebase/auth'
import Link from 'next/link'
import { useState } from 'react'
import { auth } from '@config/firebase'
import { useAuth } from '@context/authContext'
import { Button, Flex, Img, Input, Text } from '@ui'
import { useForm } from 'react-hook-form'
import MotionDiv from '@components/MotionDiv'
import LoadingPage from '@components/LoadingPage'

type StateType = 'invalid' | 'reset' | 'loading' | 'success' | 'error'

interface FormValues {
  password: string
  repeatPassword: string
}

interface ResetPasswordProps {
  valid: boolean
  oobCode: string
  email: string
}

export default function ResetPassword({
  valid,
  oobCode,
  email,
}: ResetPasswordProps): JSX.Element {
  const { login } = useAuth()
  const [state, setState] = useState<StateType>(valid ? 'invalid' : 'reset')

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>({ mode: 'onBlur', reValidateMode: 'onBlur' })

  const onSubmit = async (values: FormValues): Promise<void> => {
    setState('loading')

    try {
      await confirmPasswordReset(auth, oobCode, values.password)
      await login(email, values.password)

      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <MotionDiv state={state}>
      <Flex
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="100vh"
        padding="1rem"
      >
        {state === 'loading' && <LoadingPage />}
        {state === 'invalid' && (
          <>
            <Img src="/error.svg" height="6rem" priority />
            <Text
              fontSize="max(1.5rem, 2vw)"
              color="secondary"
              fontFamily="HelveticaRounded"
              fontWeight="bold"
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
              <Button margin="1rem 0 0 0" width="max-content" fontSize="1.2rem">
                Volver al home
              </Button>
            </Link>
          </>
        )}
        {state === 'reset' && (
          <>
            <Img
              src="/logo.svg"
              height="5rem"
              width="5rem"
              margin="0 auto 1rem auto"
            />
            <Text
              fontSize="2rem"
              color="secondary"
              fontFamily="HelveticaRounded"
            >
              Cambiar contraseña
            </Text>

            <Input
              placeholder="Contraseña"
              type="password"
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
              error={errors.password}
            />

            <Input
              placeholder="Repetir contraseña"
              type="password"
              {...register('repeatPassword', {
                required: 'Debes repetir la contraseña.',
                validate: (value, values) => {
                  return value === values.password
                    ? undefined
                    : 'Las contraseña no coinciden.'
                },
                onChange: () => {
                  clearErrors('repeatPassword')
                },
              })}
              error={errors.repeatPassword}
            />

            <Button
              padding="0.5rem 1rem"
              margin="10px 0 0 0"
              fontSize="1.2rem"
              background="secondary"
              onClick={handleSubmit(onSubmit)}
            >
              Cambiar Contraseña
            </Button>
          </>
        )}
        {state === 'success' && (
          <>
            <Img
              src="/check.svg"
              height="5rem"
              width="5rem"
              margin="0 auto 1rem auto"
            />
            <Text
              fontSize="max(1.5rem, 2vw)"
              color="secondary"
              fontFamily="HelveticaRounded"
              textAlign="center"
            >
              Contraseña cambiada
            </Text>
            <Text textAlign="center">
              La contraseña ha sido modificada con éxito.
            </Text>
            <Link href="/" passHref>
              <Button margin="1rem 0 0 0" width="max-content" fontSize="1.2rem">
                Volver al home
              </Button>
            </Link>
          </>
        )}
        {state === 'error' && (
          <>
            <Img
              src="/error.svg"
              height="5rem"
              width="5rem"
              margin="0 auto 1rem auto"
            />
            <Text
              fontSize="max(1.5rem, 2vw)"
              color="secondary"
              fontFamily="HelveticaRounded"
              textAlign="center"
            >
              Error al cambiar la contraseña.
            </Text>
            <Text textAlign="center">
              Vuelve a intentarlo mas tarde o contacta con el soporte.
            </Text>
            <Link href="/" passHref>
              <Button margin="1rem 0 0 0" width="max-content" fontSize="1.2rem">
                Volver al home
              </Button>
            </Link>
          </>
        )}
      </Flex>
    </MotionDiv>
  )
}
