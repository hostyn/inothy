import App from '@components/App'
import { auth } from '@config/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { toastError, toastSuccess } from '@services/toaster'
import { css } from '@styled-system/css'
import { Button } from '@ui/Button'
import Input from '@ui/Input'
import { PageSpacing } from '@ui/PageSpacing'
import { confirmPasswordReset } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { MdLockOutline } from 'react-icons/md'
import { z } from 'zod'

const personalInfoSchema = z
  .object({
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

type FormValues = z.infer<typeof personalInfoSchema>

export default function ResetPassword({
  verified,
  oobCode,
}: {
  verified: boolean
  oobCode: string
}): JSX.Element {
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(personalInfoSchema),
  })

  const onSubmit = async (formValues: FormValues): Promise<void> => {
    try {
      await confirmPasswordReset(auth, oobCode, formValues.password)
      toastSuccess('Contraseña restablecida con éxito.')
      // await new Promise(resolve => setTimeout(resolve, 2000))
      await push('/login')
    } catch (e) {
      toastError(
        'No se ha podido restablecer la contraseña, prueba a solicitar un nuevo enlace.'
      )
    }
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
            gap: 'md',
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
              Restablecer contraseña
            </h1>
            <p
              className={css({
                color: 'text',
                maxWidth: '50ch',
                textAlign: 'center',
              })}
            >
              Introduce tu nueva contraseña. Recuerda que debe tener al menos 8
              caracteres.
            </p>
          </div>
          <div>
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
                width: 'xl',
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
                width: 'xl',
                mb: errors.repeatPassword != null ? '2px' : '22px',
              })}
            />
          </div>
          <Button type="submit">Restablecer contraseña</Button>
        </form>
      </PageSpacing>
    </App>
  )
}
