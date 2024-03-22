import { z } from 'zod'
import TabContent from '../TabContent'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { COUNTRIES } from '@config/countries'
import { css } from '@styled-system/css'
import Input from '@ui/Input'
import useAuth from '@hooks/useAuth'
import { trpc } from '@services/trpc'
import type { KYCData, PersonalInfoStep, StepProps } from '../types'
import FieldSet from '@ui/FieldSet'
import FormElement from '@ui/FormElement'

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
  countryOfResidence: z
    .string()
    .min(1, 'El país de residencia es obligatorio.'),
})

type FormValues = z.infer<typeof personalInfoSchema>

export default function PersionalInfo({
  setData,
  next,
  ...props
}: StepProps): JSX.Element {
  const { user } = useAuth()
  const { data: fullUserData } = trpc.auth.getUserFullData.useQuery()

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
      name: fullUserData?.firstName ?? fullUserData?.billing?.firstName ?? '',
      lastName: fullUserData?.lastName ?? fullUserData?.billing?.lastName ?? '',
      birthDate:
        fullUserData?.birthDate?.toISOString().split('T')[0] ??
        new Date().toISOString().split('T')[0],
      countryOfResidence:
        fullUserData?.countryOfResidence ??
        fullUserData?.billing?.country ??
        'ES',
      nationality:
        fullUserData?.nationality ?? fullUserData?.billing?.country ?? 'ES',
    },
  })

  const onSubmit = (formValues: FormValues): void => {
    setData(
      (data: KYCData): PersonalInfoStep =>
        data?.step === 'personal-info'
          ? { ...data, ...formValues }
          : { step: 'personal-info', ...formValues }
    )
    next()
  }

  return (
    <TabContent onSubmit={handleSubmit(onSubmit)} {...props}>
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
            fontFamily: 'nunitoSans',
          })}
        >
          Datos personales
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
          Necesitamos tus datos tal y como aparecen en tu documento de
          identidad.
        </p>
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 'md',
        })}
      >
        <FieldSet>
          <FormElement label="Nombre">
            <Input
              nativePlaceholder="Juan Pablo"
              keepErrorSpace
              autoComplete="given-name"
              error={errors.name}
              {...register('name', {
                onChange: () => {
                  clearErrors('name')
                },
              })}
            />
          </FormElement>

          <FormElement label="Apellidos">
            <Input
              nativePlaceholder="Sarmiento Calderón"
              keepErrorSpace
              autoComplete="family-name"
              error={errors.lastName}
              {...register('lastName', {
                onChange: () => {
                  clearErrors('lastName')
                },
              })}
            />
          </FormElement>
        </FieldSet>
        <FieldSet>
          <FormElement label="Email">
            <Input
              nativePlaceholder="inothy@inothy.com"
              keepErrorSpace
              disabled
              autoComplete="email"
              error={errors.email}
              {...register('email', {
                onChange: () => {
                  clearErrors('email')
                },
              })}
            />
          </FormElement>

          <FormElement label="Fecha de nacimiento">
            <Input
              type="date"
              keepErrorSpace
              autoComplete="bday"
              error={errors.birthDate}
              {...register('birthDate', {
                onChange: () => {
                  clearErrors('birthDate')
                },
              })}
            />
          </FormElement>
        </FieldSet>
        <FieldSet>
          <FormElement label="Nacionalidad">
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
          </FormElement>

          <FormElement label="País de residencia">
            <select
              defaultValue="ES"
              {...register('countryOfResidence', {
                onChange: () => {
                  clearErrors('countryOfResidence')
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
          </FormElement>
        </FieldSet>
      </div>
    </TabContent>
  )
}
