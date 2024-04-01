import { css } from '@styled-system/css'
import SectionLayout from '../layouts/SectionLayout'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useAuth from '@hooks/useAuth'
import { useForm } from 'react-hook-form'
import Textarea from '@ui/Textarea'
import { useState } from 'react'
import { trpc } from '@services/trpc'
import { toastError, toastSuccess } from '@services/toaster'
import Spinner from '@components/Spinner'

const biographySchema = z.object({
  biography: z
    .string()
    .min(16, 'Debe tener al menos 16 caracteres.')
    .max(300, 'Debe tener 300 caracteres como máximo.'),
})

type FormValues = z.infer<typeof biographySchema>

export default function DescriptionSection(): JSX.Element {
  const [open, setOpen] = useState(false)
  const { userData } = useAuth()
  const utils = trpc.useContext()

  const changeBiography = trpc.auth.changeBiography.useMutation({
    onSuccess: async () => {
      await utils.auth.getUserData.invalidate()
      toastSuccess('Biografia cambiada con éxito.')
    },

    onError: error => {
      if (error.message === 'description-too-short') {
        toastError('La descripción es demasiado corta.')
      }

      if (error.message === 'description-too-long') {
        toastError('La descripción es demasiado larga.')
      }

      toastError('Ha ocurrido un error inesperado.')
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
    getValues,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(biographySchema),
    values: {
      biography: userData?.biography ?? '',
    },
  })

  const handleFormSubmit = handleSubmit(() => {
    setOpen(true)
  })

  const onSubmit = async (): Promise<void> => {
    const biography = getValues('biography')
    changeBiography.mutate({
      biography,
    })
  }

  return (
    <SectionLayout
      title="Descripción"
      description="Actualiza la descripción de tu perfil."
      bottomText="Muestale a la gente quién eres y porque deberían comprar tus apuntes."
      buttonContent={
        changeBiography.isLoading ? (
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
              descripción
            </span>
          </>
        )
      }
      disabled={
        watch('biography') === userData?.biography ||
        watch('biography').length === 0
      }
      dialogTitle="¿Cambiar descripción?"
      dialogDescription="Si aceptas esta será tu nueva descripción pública."
      dialogOnConfirm={onSubmit}
      onSubmit={handleFormSubmit}
      open={open}
      onOpenChange={state => {
        if (!state) setOpen(false)
      }}
    >
      <Textarea
        placeholder="Descripción"
        rows={6}
        className={css({ width: 'min(100%, token(sizes.2xl))', mt: '6px' })}
        error={errors.biography}
        {...register('biography', {
          onChange: () => {
            clearErrors('biography')
          },
        })}
      />
    </SectionLayout>
  )
}
