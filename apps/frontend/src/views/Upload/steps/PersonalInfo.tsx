import { zodResolver } from '@hookform/resolvers/zod'
import { css } from '@styled-system/css'
import Input from '@ui/Input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import TabContent from '../TabContent'
import type { StepProps, UploadData } from '../types'

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'El nombre es obligatorio.'),
  lastName: z.string().min(1, 'Los apellidos son obligatorios.'),
  birthDate: z.string().refine(
    date => {
      const birthDate = new Date(date)
      const today = new Date()

      const ageThresholdDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999
      )

      return birthDate <= ageThresholdDate
    },
    { message: 'Debe ser mayor de edad.' }
  ),
  phone: z.string().min(1, 'El teléfono es obligatorio.'),
})

type FormValues = z.infer<typeof personalInfoSchema>

export default function PersonalInfo({
  next,
  value,
  setData,
  prev,
  title,
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
    resolver: zodResolver(personalInfoSchema),
    values: {
      firstName: '',
      lastName: '',
      birthDate: new Date().toISOString().split('T')[0],
      phone: '',
    },
  })

  const onSubmit = (formValues: FormValues): void => {
    setData((data: UploadData) =>
      data?.step === 'complete-profile'
        ? { ...data, ...formValues }
        : { step: 'complete-profile', ...formValues }
    )
    next()
  }

  return (
    <TabContent
      value={value}
      title={title}
      prev={prev}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div
        className={css({
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'sm',
        })}
      >
        <h1
          className={css({
            fontSize: '2xl',
            fontWeight: '700',
            lineHeight: '100%',
            textAlign: 'center',
            color: 'text',
          })}
        >
          Necesitamos más información sobre tí
        </h1>
        <p
          className={css({
            fontSize: 'lg',
            maxWidth: '50ch',
            fontWeight: '400',
            lineHeight: '100%',
            textAlign: 'center',
            color: 'grey.500',
          })}
        >
          De acuerdo con la ley de servicios digitales de la UE necesitamos
          saber quién eres para que puedas vender en nuestra plataforma.
        </p>
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 'xl',
          width: '100%',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
            gap: 'md',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'sm',
              width: '100%',
            })}
          >
            <span
              className={css({
                fontSize: 'md',
                fontWeight: '700',
                lineHeight: '100%',
                color: 'text',
              })}
            >
              Nombre
            </span>
            <Input
              nativePlaceholder="Juan Pablo"
              autoComplete="given-name"
              error={errors.firstName}
              {...register('firstName', {
                onChange: () => {
                  clearErrors('firstName')
                },
              })}
            />
          </div>

          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'sm',
              width: '100%',
            })}
          >
            <span
              className={css({
                fontSize: 'md',
                fontWeight: '700',
                lineHeight: '100%',
                color: 'text',
              })}
            >
              Apellidos
            </span>
            <Input
              nativePlaceholder="Sarmiento Calderón"
              autoComplete="family-name"
              error={errors.lastName}
              {...register('lastName', {
                onChange: () => {
                  clearErrors('lastName')
                },
              })}
            />
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
            gap: 'md',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'sm',
              width: '100%',
            })}
          >
            <span
              className={css({
                fontSize: 'md',
                fontWeight: '700',
                lineHeight: '100%',
                color: 'text',
              })}
            >
              Teléfono
            </span>
            {/* TODO: Add phone prefix input */}
            <Input
              nativePlaceholder="+34 XXX XXX XXX"
              autoComplete="tel"
              error={errors.phone}
              {...register('phone', {
                onChange: () => {
                  clearErrors('phone')
                },
              })}
            />
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'sm',
              width: '100%',
            })}
          >
            <span
              className={css({
                fontSize: 'md',
                fontWeight: '700',
                lineHeight: '100%',
                color: 'text',
              })}
            >
              Fecha de nacimiento
            </span>
            <Input
              type="date"
              autoComplete="bday"
              error={errors.birthDate}
              {...register('birthDate', {
                onChange: () => {
                  clearErrors('birthDate')
                },
              })}
            />
          </div>
        </div>
      </div>
    </TabContent>
  )
}
