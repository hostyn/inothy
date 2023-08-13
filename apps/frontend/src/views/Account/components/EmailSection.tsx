import Input from '@ui/Input'
import { css } from '@styled-system/css'
import SectionLayout from '../layouts/SectionLayout'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useAuth from '@hooks/useAuth'
import { useState } from 'react'
import Spinner from '@components/Spinner'
import { toastError, toastSuccess } from '@services/toaster'
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from 'firebase/auth'
import { auth } from '@config/firebase'

const emailSchema = z.object({
  email: z.string().email('No es un email válido'),
  password: z.string(),
})

type FormValues = z.infer<typeof emailSchema>

export default function EmailSection(): JSX.Element {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
    getValues,
    setValue,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(emailSchema),
    values: {
      email: user?.email ?? '',
      password: '',
    },
  })

  const userAbleToChangeEmail =
    user.firebaseUser?.providerData.some(
      item => item.providerId === 'password'
    ) ?? false

  const handleFormSubmit = handleSubmit(async () => {
    setOpen(true)
  })

  const handleChangeEmail = async (): Promise<void> => {
    setLoading(true)
    const { email, password } = getValues()
    const user = auth.currentUser

    if (user == null) {
      toastError('Ha ocurrido un error inesperado.')
      setValue('password', '')
      setLoading(false)
      return
    }

    try {
      const userCredential = EmailAuthProvider.credential(
        user.email ?? '',
        password
      )

      await reauthenticateWithCredential(user, userCredential)
      await updateEmail(user, email)
      toastSuccess('Email cambiado correctamente. Por favor verifica tu email.')
    } catch (e) {
      if (e.code === 'auth/wrong-password') {
        toastError('Contraseña incorrecta.')
        return
      }

      if (e.code === 'auth/invalid-email') {
        toastError('Email no válido.')
        return
      }

      if (e.code === 'auth/email-already-in-use') {
        toastError('El email ya está en uso.')
        return
      }

      if (e.code === 'auth/too-many-requests') {
        toastError('Demasiados intentos. Por favor, inténtalo más tarde.')
        return
      }

      toastError('Ha ocurrido un error inesperado.')
    } finally {
      setValue('password', '')
      setLoading(false)
    }
  }

  return (
    <SectionLayout
      title="Email"
      description="Introduce tu nuevo email."
      bottomText={
        userAbleToChangeEmail
          ? 'Deberás verificar tu nuevo email para poder usar todas la funciones de la plataforma.'
          : 'Debes configurar una contraseña para poder cambiar tu email.'
      }
      buttonContent={
        loading ? (
          <Spinner className={css({ my: 'xs', mx: 'auto' })} />
        ) : (
          'Cambiar email'
        )
      }
      disabled={!userAbleToChangeEmail || user?.email === watch('email')}
      dialogTitle="¿Cambiar el email?"
      dialogDescription={
        <div className={css({ display: 'flex', flexDir: 'column', gap: 'md' })}>
          <p>
            Si cambias tu email, hasta que no lo verifiques tendrás acceso
            limitado a la plataforma.
          </p>

          <p>Introduce tu contraseña para continuar.</p>

          <Input
            placeholder="Contraseña"
            type="password"
            autoComplete="current-password"
            Icon={MdLockOutline}
            {...register('password')}
          />
        </div>
      }
      dialogOnConfirm={handleChangeEmail}
      open={open}
      onOpenChange={state => {
        if (!state) setOpen(false)
      }}
      onSubmit={handleFormSubmit}
    >
      <Input
        placeholder="Nombre de usuario"
        Icon={MdOutlineEmail}
        error={errors.email}
        disabled={!userAbleToChangeEmail}
        {...register('email', {
          onChange: () => {
            clearErrors('email')
          },
        })}
        className={css({ width: '2xl', mt: '6px' })}
      />
    </SectionLayout>
  )
}
