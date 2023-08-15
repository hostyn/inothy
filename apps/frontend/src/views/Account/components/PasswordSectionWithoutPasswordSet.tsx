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
import { reauthenticateWithPopup, updatePassword } from 'firebase/auth'
import { auth, googleProvider } from '@config/firebase'

const passwordSchema = z.object({
  newPassword: z
    .string()
    .min(1, 'La contraseña es obligatoria.')
    .min(8, 'Debe tener al menos 8 caracteres.'),
  repeatPassword: z.string().min(1, 'Debes repetir la contraseña.'),
})

type FormValues = z.infer<typeof passwordSchema>

export default function PasswordSectionWithoutPasswordSet(): JSX.Element {
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
    const { newPassword } = getValues()
    const user = auth.currentUser

    if (user == null) {
      toastError('Ha ocurrido un error inesperado.')
      reset()
      setLoading(false)
      return
    }

    try {
      // TODO: Change provider to whatever the user has
      await reauthenticateWithPopup(user, googleProvider)
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
      title="Añadir contraseña"
      description="Añade una contraseña a tu cuenta para poder iniciar sesión con email y contraseña."
      bottomText="Debe tener al menos 8 caracteres."
      buttonContent={
        loading ? (
          <Spinner className={css({ my: 'xs', mx: 'auto' })} />
        ) : (
          'Cambiar contraseña'
        )
      }
      disabled={false}
      dialogTitle="¿Añadir contraseña?"
      dialogDescription="Tienes que volver a iniciar sesión para añadir una contraseña."
      dialogOnConfirm={handleChangePassword}
      dialogConfirmText="Iniciar sesión"
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
            width: '2xl',
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
            width: '2xl',
            mt: '6px',
            mb: errors.repeatPassword != null ? '0' : '20px',
          })}
        />
      </div>
    </SectionLayout>
  )
}
