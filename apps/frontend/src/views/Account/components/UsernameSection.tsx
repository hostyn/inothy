import Input from '@ui/Input'
import { css } from '@styled-system/css'
import SectionLayout from '../layouts/SectionLayout'
import { AiOutlineUser } from 'react-icons/ai'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useAuth from '@hooks/useAuth'
import { useState } from 'react'
import { trpc } from '@services/trpc'
import Spinner from '@components/Spinner'
import { toastError, toastSuccess } from '@services/toaster'

const usernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Debe tener al menos 3 caracteres.')
    .max(30, 'Debe tener menos de 30 caracteres.')
    .regex(
      /^[a-z_\d](?!.*?\.{2})[a-z._\d]{1,28}[a-z_\d]$/,
      'Nombre de usuario inválido.'
    ),
})

type FormValues = z.infer<typeof usernameSchema>

const addSixMonts = (date: Date): Date => {
  return new Date(date.getTime() + 6 * 30 * 24 * 60 * 60 * 1000)
}

export default function UsernameSection(): JSX.Element {
  const { userData } = useAuth()
  const [open, setOpen] = useState(false)
  const utils = trpc.useContext()
  const usernameAvailable = trpc.auth.usernameAvailable.useMutation()
  const changeUsername = trpc.auth.changeUsername.useMutation({
    onSuccess: async () => {
      await utils.auth.getUserData.invalidate()
      toastSuccess('Nombre de usuario cambiado con éxito.')
    },

    onError: error => {
      if (error.message === 'username-already-exists') {
        toastError('El nombre de usuario está en uso.')
        return
      }

      if (error.message === 'already-username') {
        toastError('Este ya es tu nombre de usuario.')
        return
      }

      if (error.message === 'invalid-username') {
        toastError('El nobmre de usuario no es válido.')
        return
      }

      if (error.message === 'username-too-long') {
        toastError('El nobmre de usuario es demasiado largo.')
        return
      }

      if (error.message === 'username-too-short') {
        toastError('El nobmre de usuario es demasiado corto.')
        return
      }

      if (error.message === 'username-changed-recently') {
        toastError(
          'Ya has cambiado el nombre de usuario en los utimos 6 meses.'
        )
        return
      }

      toastError('Ha ocurrido un error inesperado.')
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
    watch,
    getValues,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(usernameSchema),
    values: {
      username: userData?.username ?? '',
    },
  })

  const handleFormSubmit = handleSubmit(async ({ username }) => {
    try {
      const isUsernameAvailable = await usernameAvailable.mutateAsync({
        username,
      })

      if (!isUsernameAvailable) {
        setError('username', {
          message: 'El nombre de usuario está en uso.',
        })
        return
      }

      setOpen(true)
    } catch {
      toastError('Ha ocurrido un error.')
    }
  })

  const handleChangeUsername = async (): Promise<void> => {
    const username = getValues('username')

    changeUsername.mutate({ username })
  }

  return (
    <SectionLayout
      title="Nombre de usuario"
      description="Puedes cambiar tu nombre de usuario una vez cada 6 meses."
      bottomText={
        userData?.usernameChangedDate != null &&
        addSixMonts(userData?.usernameChangedDate) > new Date()
          ? `Podrás cambiar el nombre de nuevo el ${addSixMonts(
              userData.usernameChangedDate
            ).toLocaleDateString('es')}.`
          : 'Usa un máximo de 30 caracteres.'
      }
      buttonContent={
        changeUsername.isLoading ? (
          <Spinner className={css({ my: 'xs', mx: 'auto' })} />
        ) : (
          'Cambiar nombre'
        )
      }
      disabled={
        (userData?.usernameChangedDate != null &&
          addSixMonts(userData?.usernameChangedDate) > new Date()) ||
        changeUsername.isLoading ||
        userData?.username === watch('username')
      }
      dialogTitle="¿Cambiar nombre de usuario?"
      dialogDescription="Si cambias tu nombre de usuario, no podrás cambiarlo de nuevo hasta dentro de 6 meses."
      dialogOnConfirm={handleChangeUsername}
      open={open}
      onOpenChange={state => {
        if (!state) setOpen(false)
      }}
      onSubmit={handleFormSubmit}
    >
      <Input
        placeholder="Nombre de usuario"
        Icon={AiOutlineUser}
        error={errors.username}
        {...register('username', {
          onChange: () => {
            clearErrors('username')
          },
        })}
        className={css({ width: 'min(100%, token(sizes.2xl))', mt: '6px' })}
      />
    </SectionLayout>
  )
}
