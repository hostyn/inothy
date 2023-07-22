import App from '@components/App'
import authContentSSR from '@middleware/authContentSSR'
import { css } from '@styled-system/css'
import { PageSpacing } from '@ui/PageSpacing'
import { Button } from '@ui/Button'
import Input from '@ui/Input'
import { Link } from '@ui/Link'
import { type NextPage } from 'next'
import Head from 'next/head'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md'
import NextLink from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import Spinner from '@components/Spinner'
import authContent from '@middleware/authContent'
import { useRouter } from 'next/router'
import OAuthProviders from '@components/OAuthProviders'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@config/firebase'
import { toastError } from '@services/toaster'

const loginSchema = z
  .object({
    email: z.string().email('Email inválido.'),
    password: z
      .string()
      .min(1, 'La contraseña es obligatoria.')
      .min(8, 'Debe tener al menos 8 caracteres.'),
    repeatPassword: z.string().min(1, 'Debes repetir la contraseña.'),
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['repeatPassword'],
  })

type FormValues = z.infer<typeof loginSchema>

const termsStyles = css({
  fontWeight: 'bold',
  color: 'grey.500',
  borderRadius: 'md',

  _hover: { textDecoration: 'underline' },

  _focus: {
    outline: '3px solid token(colors.primary.300)',
  },
})

const Register: NextPage = () => {
  const [loading, setLoading] = useState(false)

  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(loginSchema),
  })

  const onRegisterWithEmailAndPassword: SubmitHandler<FormValues> = async ({
    email,
    password,
  }) => {
    try {
      setLoading(true)
      await createUserWithEmailAndPassword(auth, email, password)
      await push('/')
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        setError('email', {
          type: 'manual',
          message: 'El email ya está en uso.',
        })
        return
      }

      if (e.code === 'auth/invalid-email') {
        setError('email', {
          type: 'manual',
          message: 'El email no es válido.',
        })
        return
      }

      if (e.code === 'auth/weak-password') {
        setError('password', {
          type: 'manual',
          message: 'La contraseña es muy débil.',
        })
        return
      }

      toastError(
        'Ha ocurrido un error inesperado, vuelve a intentarlo más tarde.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Inothy - Registro</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <App>
        <PageSpacing
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDir: 'column',
              alignItems: 'center',
              gap: 'lg',
            })}
          >
            <h1
              className={css({
                fontSize: 'xl',
                fontWeight: '700',
                color: 'text',
              })}
            >
              Registrarse
            </h1>
            <form
              noValidate
              onSubmit={handleSubmit(onRegisterWithEmailAndPassword)}
              className={css({
                display: 'flex',
                flexDir: 'column',
                alignItems: 'center',
                width: 'xl',
              })}
            >
              <Input
                placeholder="Email"
                Icon={MdOutlineEmail}
                type="email"
                error={errors.email}
                autoComplete="username"
                {...register('email', {
                  onChange: () => {
                    clearErrors('email')
                  },
                })}
                className={css({ mb: errors.email != null ? '6px' : '26px' })}
              />

              <Input
                placeholder="Contraseña"
                Icon={MdLockOutline}
                type="password"
                error={errors.password}
                autoComplete="new-password"
                {...register('password', {
                  onChange: () => {
                    clearErrors('password')
                  },
                })}
                className={css({
                  mb: errors.password != null ? '6px' : '26px',
                })}
              />

              <Input
                placeholder="Repetir contraseña"
                Icon={MdLockOutline}
                type="password"
                error={errors.repeatPassword}
                autoComplete="new-password"
                {...register('repeatPassword', {
                  onChange: () => {
                    clearErrors('repeatPassword')
                  },
                })}
                className={css({
                  mb: errors.repeatPassword != null ? '2px' : '22px',
                })}
              />
              <Button className={css({ width: '110px' })} disabled={loading}>
                {loading ? (
                  <Spinner className={css({ my: 'xs', mx: 'auto' })} />
                ) : (
                  'Registrarse'
                )}
              </Button>
            </form>

            <Link className={css({ fontWeight: '500' })} href="/login">
              ¿Ya tienes cuenta? Inicia sesión.
            </Link>

            <OAuthProviders text="registrarse" />

            <p className={css({ fontSize: 'sm', color: 'grey.400' })}>
              Al registrarte aceptas nuestros{' '}
              <NextLink href="/legal" className={termsStyles}>
                Términos y Condiciones
              </NextLink>{' '}
              y{' '}
              <NextLink href="privacy" className={termsStyles}>
                Política de Privacidad
              </NextLink>
            </p>
          </div>
        </PageSpacing>
      </App>
    </>
  )
}

export default authContent(Register)
export const getServerSideProps = authContentSSR()
