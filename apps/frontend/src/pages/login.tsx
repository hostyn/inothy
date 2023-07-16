import App from '@components/App'
import authContentSSR from '@middleware/authContentSSR'
import publicContent from '@middleware/publicContent'
import { css } from '@styled-system/css'
import { AppContext } from '@ui/AppContext'
import { Button } from '@ui/Button'
import Input from '@ui/Input'
import { Link } from '@ui/Link'
import { Separator } from '@ui/Separator'
import { type NextPage } from 'next'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineTwitter } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import NextLink from 'next/link'
import { signInWithRedirect } from 'firebase/auth'
import { auth, googleProvider } from '@config/firebase'
import useAuth from '@hooks/useAuth'

interface FormValues {
  email: string
  password: string
}

const termsStyles = css({
  fontWeight: 'bold',
  color: 'grey.500',
  _hover: { textDecoration: 'underline' },
})

const oAuthButtonStyles = css({
  borderRadius: '10000rem',
  bg: 'grey.100',
  width: '5xs',
  height: '5xs',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
})

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const { user } = useAuth()

  console.log(user)

  const handleGoogleLogin = async (): Promise<void> => {
    await signInWithRedirect(auth, googleProvider)
  }

  return (
    <>
      <Head>
        <title>Inothy - Iniciar sesión</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <App>
        <AppContext
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
              onSubmit={handleSubmit(data => {
                console.log(data)
              })}
              className={css({
                display: 'flex',
                flexDir: 'column',
                alignItems: 'center',
                width: 'xl',
                gap: 'md',
              })}
            >
              <Input
                placeholder="Email"
                Icon={MdOutlineEmail}
                {...register('email', {
                  required: 'El email es obligatorio.',
                  minLength: {
                    value: 10,
                    message: 'El email es demasiado corto.',
                  },
                  onChange: () => {
                    clearErrors('email')
                  },
                })}
                error={errors.email}
              />
              <Input
                placeholder="Contraseña"
                Icon={MdLockOutline}
                {...register('password', {
                  required: 'La contraseña es obligatoria.',
                  minLength: {
                    value: 10,
                    message: 'La contraseña es demasiado corta.',
                  },
                  onChange: () => {
                    clearErrors('password')
                  },
                })}
                error={errors.password}
              />
              <Button className={css({ width: 'fit-content' })}>
                Iniciar sesión
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
            <div
              className={css({
                display: 'flex',
                flexDir: 'column',
                alignItems: 'center',
                width: 'xl',
                gap: 'md',
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  gap: 'sm',
                  height: '2px',
                })}
              >
                <Separator />
                <p
                  className={css({
                    width: 'max-content',
                    textWrap: 'nowrap',
                    color: 'grey.200',
                  })}
                >
                  iniciar sesión con
                </p>
                <Separator />
              </div>

              <div
                className={css({
                  display: 'flex',
                  gap: 'sm',
                })}
              >
                <button
                  className={oAuthButtonStyles}
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle size={24} />
                </button>

                <div className={oAuthButtonStyles}>
                  <AiOutlineTwitter
                    size={24}
                    className={css({ fill: '#1DA1F2' })}
                  />
                </div>

                <div className={oAuthButtonStyles}>
                  <BsFacebook size={24} className={css({ fill: '#3b5998' })} />
                </div>
              </div>

              <Separator />
            </div>

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
        </AppContext>
      </App>
    </>
  )
}

export default publicContent(Home)
export const getServerSideProps = authContentSSR()
