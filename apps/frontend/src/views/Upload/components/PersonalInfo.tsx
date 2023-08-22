import { COUNTRIES } from '@config/countries'
import { zodResolver } from '@hookform/resolvers/zod'
import useAuth from '@hooks/useAuth'
import { css } from '@styled-system/css'
import Input from '@ui/Input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import TabContent from '../TabContent'
import type { StepProps, UploadData } from '../types'

const personalInfoSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio.'),
  lastName: z.string().min(1, 'Los apellidos son obligatorios.'),
  email: z.string().email('Email inválido.'),
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
  nationality: z.string().min(1, 'La nacionalidad es obligatoria.'),
  countryOfResidency: z
    .string()
    .min(1, 'El país de residencia es obligatorio.'),
})

type FormValues = z.infer<typeof personalInfoSchema>

export default function PersonalInfo({
  next,
  value,
  setData,
  prev,
  title,
}: StepProps): JSX.Element {
  const { user } = useAuth()

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
      email: user.email ?? '',
      name: '',
      lastName: '',
      countryOfResidency: 'ES',
      nationality: 'ES',
      birthDate: new Date().toISOString().split('T')[0],
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
              error={errors.name}
              {...register('name', {
                onChange: () => {
                  clearErrors('name')
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
              Email
            </span>
            <Input
              nativePlaceholder="juanpa@gmail.com"
              disabled
              autoComplete="email"
              error={errors.email}
              {...register('email', {
                onChange: () => {
                  clearErrors('email')
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
              Nacionalidad
            </span>
            <select
              defaultValue="ES"
              {...register('nationality', {
                onChange: () => {
                  clearErrors('nationality')
                },
              })}
              className={css({
                color: 'primary.500',
                bg: 'grey.100',
                borderRadius: 'md',
                paddingLeft: 'sm',
                paddingRight: 'xl',
                height: '6xs',
                width: '100%',
                transition:
                  'background 150ms ease, outline-width 50ms ease-in-out',

                _focus: {
                  bg: 'white',
                  outline: '3px solid token(colors.primary.300)',
                },
              })}
            >
              {COUNTRIES.map(country => (
                <option key={country.iso} value={country.iso}>
                  {country.name}
                </option>
              ))}
            </select>
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
              País de residencia
            </span>
            <select
              defaultValue="ES"
              {...register('countryOfResidency', {
                onChange: () => {
                  clearErrors('countryOfResidency')
                },
              })}
              className={css({
                color: 'primary.500',
                bg: 'grey.100',
                borderRadius: 'md',
                paddingLeft: 'sm',
                paddingRight: 'xl',
                height: '6xs',
                width: '100%',
                transition:
                  'background 150ms ease, outline-width 50ms ease-in-out',

                _focus: {
                  bg: 'white',
                  outline: '3px solid token(colors.primary.300)',
                },
              })}
            >
              {COUNTRIES.map(country => (
                <option key={country.iso} value={country.iso}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </TabContent>
  )
}
