import Input from '@ui/Input'
import { css } from '@styled-system/css'
import SectionLayout from '../layouts/SectionLayout'
import { MdLockOutline } from 'react-icons/md'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Spinner from '@components/Spinner'
import { toastError, toastSuccess } from '@services/toaster'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth'
import { auth } from '@config/firebase'

const passwordSchema = z.object({
  password: z.string().min(1, 'Debes introducir la contraseña actual.'),
  newPassword: z
    .string()
    .min(1, 'La contraseña es obligatoria.')
    .min(8, 'Debe tener al menos 8 caracteres.'),
  repeatPassword: z.string().min(1, 'Debes repetir la contraseña.'),
})

type FormValues = z.infer<typeof passwordSchema>

export default function PasswordSectionWithPasswordSet(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setError,
    getValues,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(passwordSchema),
  })

  const handleFormSubmit = handleSubmit(
    async ({ newPassword, repeatPassword }) => {
      if (newPassword !== repeatPassword) {
        setError('repeatPassword', {
          message: 'Las contraseñas no coinciden.',
        })
        return
      }

      setOpen(true)
    }
  )

  const handleChangePassword = async (): Promise<void> => {
    setLoading(true)
    const { newPassword, password } = getValues()
    const user = auth.currentUser

    if (user == null) {
      toastError('Ha ocurrido un error inesperado.')
      reset()
      setLoading(false)
      return
    }

    try {
      const userCredential = EmailAuthProvider.credential(
        user.email ?? '',
        password
      )

      await reauthenticateWithCredential(user, userCredential)
      await updatePassword(user, newPassword)
      toastSuccess('Contraseña cambiada correctamente.')
    } catch (e) {
      if (e.code === 'auth/wrong-password') {
        toastError('Contraseña incorrecta.')
        return
      }

      toastError('Ha ocurrido un error inesperado.')
    } finally {
      reset()
      setLoading(false)
    }
  }

  return (
    <SectionLayout
      title="Contraseña"
      description="Debe tener al menos 8 caracteres."
      bottomText="Si crees que alguien ha accedido a tu cuenta, cambia tu contraseña de inmediato."
      buttonContent={
        loading ? (
          <Spinner className={css({ my: 'xs', mx: 'auto' })} />
        ) : (
          <>
            Cambiar{' '}
            <span
              className={css({
                display: 'none',
                md: { display: 'inline' },
              })}
            >
              contraseña
            </span>
          </>
        )
      }
      disabled={false}
      dialogTitle="¿Cambiar contraseña?"
      dialogDescription="Si cambias tu contraseña, se cerrará la sesión en todos tus dispositivos."
      dialogOnConfirm={handleChangePassword}
      open={open}
      onOpenChange={state => {
        if (!state) setOpen(false)
      }}
      onSubmit={handleFormSubmit}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <Input
          placeholder="Contraseña actual"
          Icon={MdLockOutline}
          autoComplete="current-password"
          type="password"
          error={errors.password}
          {...register('password', {
            onChange: () => {
              clearErrors('password')
            },
          })}
          className={css({
            width: 'min(100%, token(sizes.2xl))',
            mt: '6px',
            mb: errors.password != null ? '0' : '20px',
          })}
        />

        <Input
          placeholder="Nueva contraseña"
          Icon={MdLockOutline}
          autoComplete="new-password"
          type="password"
          error={errors.newPassword}
          {...register('newPassword', {
            onChange: () => {
              clearErrors('newPassword')
            },
          })}
          className={css({
            width: 'min(100%, token(sizes.2xl))',
            mt: '6px',
            mb: errors.newPassword != null ? '0' : '20px',
          })}
        />

        <Input
          placeholder="Repetir contraseña"
          Icon={MdLockOutline}
          autoComplete="new-password"
          type="password"
          error={errors.repeatPassword}
          {...register('repeatPassword', {
            onChange: () => {
              clearErrors('repeatPassword')
            },
          })}
          className={css({
            width: 'min(100%, token(sizes.2xl))',
            mt: '6px',
            mb: errors.repeatPassword != null ? '0' : '20px',
          })}
        />
      </div>
    </SectionLayout>
  )
}
