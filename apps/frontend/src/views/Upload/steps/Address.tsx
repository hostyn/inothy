import { COUNTRIES } from '@config/countries'
import { zodResolver } from '@hookform/resolvers/zod'
import { css } from '@styled-system/css'
import Input from '@ui/Input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import TabContent from '../TabContent'
import type { StepProps } from '../types'
import { trpc } from '@services/trpc'
import { toastError } from '@services/toaster'
import { useState } from 'react'

const personalInfoSchema = z.object({
  line1: z.string().min(1, 'La linea 1 es obligatoria.'),
  line2: z.string(),
  country: z.string().min(1, 'El país es obligatorio.'),
  city: z.string().min(1, 'La ciudad es obligatoria.'),
  region: z.string(),
  postalCode: z.string().min(1, 'El codigo postal es obligatorio.'),
})

const MutationErrors: Record<string, string> = {
  'first-name-required': 'El nombre es obligatorio.',
  'last-name-required': 'El apellido es obligatorio.',
  underage: 'Debes ser mayor de edad para registrarte.',
  'country-required': 'El país es obligatorio.',
  'invalid-country': 'El país no es válido.',
  'city-required': 'La ciudad es obligatoria.',
  'postal-code-required': 'El codigo postal es obligatorio.',
  'phone-required': 'El telefono es obligatorio.',
  'already-seller':
    'Ya has completado tu perfil. Por favor, refresca la página.',
  'invalid-postal-code': 'El codigo postal no es válido.',
  'invalid-city': 'La ciudad no es válida.',
  'invalid-phone': 'El telefono no es válido.',
}

type FormValues = z.infer<typeof personalInfoSchema>

export default function Address({
  next,
  value,
  title,
  prev,
  data,
  ...props
}: StepProps): JSX.Element {
  const [loading, setLoading] = useState(false)

  const upgradeUserToSeller = trpc.auth.upgradeUserToSeller.useMutation({
    onError: error => {
      setLoading(false)

      if (error.message in MutationErrors) {
        toastError(MutationErrors[error.message])
        return
      }

      toastError('Ha ocurrido un error inesperado, intentelo mas tarde.')
    },
    onSuccess: () => {
      setLoading(false)
      next()
    },
  })

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
      country: 'ES',
      line1: '',
      line2: '',
      city: '',
      region: '',
      postalCode: '',
    },
  })

  const onSubmit = (values: FormValues): void => {
    if (data?.step !== 'complete-profile') {
      toastError('Ha ocurrido un error inesperado, intentelo mas tarde.')
      return
    }

    setLoading(true)

    const { birthDate, ...compatibleData } = data

    const birthDateObject = new Date(birthDate)
    const birthDateUTC = new Date(
      Date.UTC(
        birthDateObject.getFullYear(),
        birthDateObject.getMonth(),
        birthDateObject.getDate()
      )
    )

    upgradeUserToSeller.mutate({
      ...values,
      ...compatibleData,
      birthDate: birthDateUTC.getTime(),
    })
  }

  return (
    <TabContent
      value={value}
      title={title}
      prev={prev}
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
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
          Dirección
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
          Por ultimo tu dirección.
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
              Linea 1
            </span>
            <Input
              nativePlaceholder="Avenida Calcuta 34, Planta 2 Izquierda"
              autoComplete="address-line1"
              error={errors.line1}
              {...register('line1', {
                onChange: () => {
                  clearErrors('line1')
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
              Linea 2
            </span>
            <Input
              nativePlaceholder="Calle General del Rosario 24, Escalera 2"
              autoComplete="address-line2"
              error={errors.line2}
              {...register('line2', {
                onChange: () => {
                  clearErrors('line2')
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
              País
            </span>
            <select
              defaultValue="ES"
              {...register('country', {
                onChange: () => {
                  clearErrors('country')
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
              Ciudad
            </span>
            <Input
              nativePlaceholder="Madrid"
              error={errors.city}
              {...register('city', {
                onChange: () => {
                  clearErrors('city')
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
              Región
            </span>
            <Input
              nativePlaceholder="Madrid"
              error={errors.region}
              {...register('region', {
                onChange: () => {
                  clearErrors('region')
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
              Codigo postal
            </span>
            <Input
              nativePlaceholder="28001"
              error={errors.postalCode}
              {...register('postalCode', {
                onChange: () => {
                  clearErrors('postalCode')
                },
              })}
            />
          </div>
        </div>
      </div>
    </TabContent>
  )
}
