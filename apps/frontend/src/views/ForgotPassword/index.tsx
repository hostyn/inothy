import App from '@components/App'
import { zodResolver } from '@hookform/resolvers/zod'
import { toastError, toastSuccess } from '@services/toaster'
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { Button } from '@ui/Button'
import Input from '@ui/Input'
import { Link } from '@ui/Link'
import { PageSpacing } from '@ui/PageSpacing'
import { useForm } from 'react-hook-form'
import { MdOutlineEmail } from 'react-icons/md'
import { z } from 'zod'

const personalInfoSchema = z.object({
  email: z
    .string()
    .min(1, 'Debes introducir un email.')
    .email('El email no es válido.'),
})

type FormValues = z.infer<typeof personalInfoSchema>

export default function ForgotPassword(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(personalInfoSchema),
  })

  const forgotPassword = trpc.auth.forgotPassword.useMutation({
    onSuccess: () => {
      reset()
      toastSuccess('Te hemos enviado un correo para restablecer tu contraseña.')
    },

    onError: error => {
      if (error.message === 'auth/email-not-found') {
        toastError('No hemos encontrado ningún usuario con ese email.')
        return
      }

      toastError('Ha ocurrido un error')
    },
  })

  const onSubmit = (formValues: FormValues): void => {
    forgotPassword.mutate(formValues)
  }

  return (
    <App>
      <PageSpacing
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        })}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'lg',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            })}
          >
            <h1
              className={css({
                fontSize: 'xl',
                fontWeight: '700',
                color: 'text',
              })}
            >
              ¿Has olvidado tu contraseña?
            </h1>
            <p
              className={css({
                color: 'text',
                maxWidth: '50ch',
                textAlign: 'center',
              })}
            >
              Introduce tu email y te enviaremos un correo para que puedas
              cambiar tu contraseña.
            </p>
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'sm',
            })}
          >
            <Input
              placeholder="Email"
              Icon={MdOutlineEmail}
              type="email"
              error={errors.email}
              keepErrorSpace
              autoComplete="username"
              {...register('email', {
                onChange: () => {
                  clearErrors('email')
                },
              })}
              className={css({
                width: 'xl',
              })}
            />
            <Button disabled={forgotPassword.isLoading}>
              Restablecer contraseña
            </Button>
          </div>

          <div
            className={css({
              display: 'flex',
              flexDir: 'column',
              alignItems: 'center',
              width: 'xl',
            })}
          >
            <Link weight="normal" href="/login">
              ¿Ya tienes cuenta? Inicia sesión.
            </Link>
            <Link weight="normal" href="/register">
              ¿No tienes una cuenta? Regístrate.
            </Link>
          </div>
        </form>
      </PageSpacing>
    </App>
  )
}
