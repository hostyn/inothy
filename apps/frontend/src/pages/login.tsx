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
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@config/firebase'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toastError } from '@services/toaster'
import { useState } from 'react'
import Spinner from '@components/Spinner'
import authContent from '@middleware/authContent'
import { useRouter } from 'next/router'
import OAuthProviders from '@components/OAuthProviders'

const loginSchema = z.object({
  email: z.string().email('Email inválido.'),
  password: z.string().min(1, 'La contraseña es obligatoria.'),
})

type FormValues = z.infer<typeof loginSchema>

const termsStyles = css({
  fontWeight: 'bold',
  color: 'grey.500',
  borderRadius: 'md',
  transition: 'outline-width 50ms ease-in-out',

  _hover: { textDecoration: 'underline' },

  _focus: {
    outline: '3px solid token(colors.primary.300)',
  },
})

const Login: NextPage = () => {
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

  const onLoginWithEmailAndPassword: SubmitHandler<FormValues> = async ({
    email,
    password,
  }) => {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      await push('/')
    } catch (e) {
      if (e.code === 'auth/wrong-password') {
        setError('password', {
          message: 'Contraseña incorrecta.',
        })
        return
      }

      if (e.code === 'auth/user-not-found') {
        setError('email', {
          message: 'Email no encontrado.',
        })
        return
      }

      if (e.code === 'auth/too-many-requests') {
        setError('email', {
          message: 'Demasiados intentos.',
        })
        toastError('Demasiados intentos, intentalo de nuevo más tarde.')
        return
      }

      if (e.code === 'auth/invalid-email') {
        setError('email', {
          message: 'Email inválido.',
        })
        return
      }

      if (e.code === 'auth/user-disabled') {
        setError('email', {
          message: 'Usuario deshabilitado.',
        })
        toastError(
          'El usuario ha sido deshabilitado, contacta con el soporte para mas información.'
        )
        return
      }

      toastError('No se ha podido iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Iniciar sesión - Inothy</title>
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
              Iniciar Sesión
            </h1>
            <form
              noValidate
              onSubmit={handleSubmit(onLoginWithEmailAndPassword)}
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
                className={css({
                  width: '100%',
                  mb: errors.email != null ? '6px' : '26px',
                })}
              />
              <Input
                placeholder="Contraseña"
                Icon={MdLockOutline}
                type="password"
                error={errors.password}
                autoComplete="current-password"
                {...register('password', {
                  onChange: () => {
                    clearErrors('password')
                  },
                })}
                className={css({
                  width: '100%',
                  mb: errors.password != null ? '2px' : '22px',
                })}
              />
              <Button className={css({ width: '110px' })} disabled={loading}>
                {loading ? (
                  <Spinner className={css({ my: 'xs', mx: 'auto' })} />
                ) : (
                  'Iniciar sesión'
                )}
              </Button>
            </form>

            <div
              className={css({
                display: 'flex',
                flexDir: 'column',
                alignItems: 'center',
                width: 'xl',
              })}
            >
              <Link className={css({ fontWeight: '500' })} href="/register">
                ¿No tienes una cuenta? Regístrate.
              </Link>
              <Link
                className={css({ fontWeight: '500' })}
                href="/forgot-password"
              >
                ¿Has olvidado tu contraseña?
              </Link>
            </div>

            <OAuthProviders text="iniciar sesión" />

            <p className={css({ fontSize: 'sm', color: 'grey.400' })}>
              Al iniciar aceptas nuestros{' '}
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

export default authContent(Login)
export const getServerSideProps = authContentSSR()
