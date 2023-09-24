import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps, UploadData } from '../types'
import Input from '@ui/Input'
import Textarea from '@ui/Textarea'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const titleAndDescripcionSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es obligatorio.')
    .min(10, 'El título debe tener al menos 10 caracteres.')
    .max(100, 'El título debe tener como máximo 100 caracteres.'),
  description: z
    .string()
    .min(1, 'La descripción es obligatoria.')
    .max(2000, 'La descripción debe tener como máximo 2000 caracteres.'),
})

type FormValues = z.infer<typeof titleAndDescripcionSchema>

export default function TitleAndDescription({
  next,
  value,
  title,
  setData,
  ...props
}: StepProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(titleAndDescripcionSchema),
  })

  const onSubmit = (values: FormValues): void => {
    setData((data: UploadData) => ({ ...data, ...values }))
    next()
  }

  return (
    <TabContent
      value={value}
      title={title}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
          gap: '3xl',
        })}
      >
        <h1
          className={css({
            fontSize: '2xl',
            color: 'text',
            fontWeight: '700',
          })}
        >
          Describe tu documento
        </h1>

        <div
          className={css({
            display: 'flex',
            gap: 'md',
            flexDir: 'column',
            width: '4xl',
          })}
        >
          <div className={containerStyles}>
            <h2 className={subtitleStyles}>Título</h2>
            <p className={css({ lineHeight: '100%', color: 'grey.500' })}>
              Vé al grano, ¿qué se van a encontrar los estudiantes cuando hagan
              click en tus apuntes? ¿qué es lo mas valioso de tu documento?
            </p>
            <Input
              size="lg"
              keepErrorSpace
              nativePlaceholder="Ejercicios resueltos del tema 3"
              {...register('title', {
                onChange: () => {
                  clearErrors('title')
                },
              })}
              error={errors.title}
            />
          </div>
          <div className={containerStyles}>
            <h2 className={subtitleStyles}>Descripción</h2>
            <p className={css({ lineHeight: '100%', color: 'grey.500' })}>
              Describe tu documento de una forma extensa, ¡los estudiantes
              tienen que saber qué están comprando!
            </p>

            <Textarea
              rows={10}
              keepErrorSpace
              nativePlaceholder="Este documento contiene los ejercicios resueltos del tema 3, del 1 al 31..."
              {...register('description', {
                onChange: () => {
                  clearErrors('description')
                },
              })}
              error={errors.description}
            />
          </div>
        </div>
      </div>
    </TabContent>
  )
}

const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'md',
})

const subtitleStyles = css({
  fontSize: 'xl',
  fontWeight: '700',
  color: 'text',
  lineHeight: '100%',
})
