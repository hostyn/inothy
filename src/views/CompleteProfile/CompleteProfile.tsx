import Textarea from '@components/ui/Textarea'
import { useEffect } from 'react'
import { useAuth } from '@context/authContext'
import { isUsernameAvailable } from '@util/api'
import { Input } from '@ui'
import { useForm } from 'react-hook-form'
import FormBody from '@components/FormBody'
import type { CompleteProfileBaseProps } from '.'

interface FormValues {
  username: string
  biography: string
}

export default function CompleteProfile({
  userData,
  setUserData,
  setState,
}: CompleteProfileBaseProps): JSX.Element {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    getValues,
    setFocus,
  } = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      username: userData.username,
      biography: userData.biography,
    },
  })

  const onSubmit = (values: FormValues): void => {
    setUserData(data => ({
      ...data,
      ...values,
      completeProfileCompleted: true,
    }))
    setState('personalData')
  }

  useEffect(() => {
    if (getValues('username').length > 0) return
    if (user == null) return
    if (user.data?.username == null) return
    setValue('username', user.data?.username)
  }, [user])

  useEffect(() => {
    setFocus('username')
  }, [])

  return (
    <FormBody
      title="Información de usuario"
      handleSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="Nombre de usuario"
        {...register('username', {
          required: 'El nombre de usuario es obligatoio',
          minLength: {
            value: 4,
            message: 'El nombre de usuario es demasiado corto. Mínimo 4.',
          },
          maxLength: {
            value: 30,
            message: 'El nombre de usuario de demasiado largo. Máximo 30.',
          },
          pattern: {
            value: /^[a-zA-Z][a-zA-Z\d_\-.]{3,29}$/,
            message: 'El nombre de usuario es inválido.',
          },
          validate: async username => {
            return username === user?.data?.username
              ? undefined
              : (await isUsernameAvailable(username))
              ? undefined
              : 'En nombre de usuario no está disponible.'
          },
          onChange: () => {
            clearErrors('username')
          },
        })}
        error={errors.username}
      />

      <Textarea
        placeholder="Biografía"
        rows={10}
        {...register('biography', {
          required: 'La biografía es obligatoria.',
          minLength: {
            value: 20,
            message: 'La biografía es muy corta. Mínimo 20.',
          },
          maxLength: {
            value: 500,
            message: 'La biografía es muy larga. Máximo 500.',
          },
          onChange: () => {
            clearErrors('biography')
          },
        })}
        error={errors.biography}
      />
    </FormBody>
  )
}
