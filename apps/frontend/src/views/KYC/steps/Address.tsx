import { COUNTRIES } from '@config/countries'
import { zodResolver } from '@hookform/resolvers/zod'
import { css } from '@styled-system/css'
import Input from '@ui/Input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import TabContent from '../TabContent'
import type { AddressStep, KYCData, StepProps } from '../types'
import { trpc } from '@services/trpc'
import FieldSet from '@ui/FieldSet'
import FormElement from '@ui/FormElement'

const personalInfoSchema = z.object({
  address1: z.string().min(1, 'La linea 1 es obligatoria.'),
  address2: z.string(),
  country: z.string().min(1, 'El país es obligatorio.'),
  city: z.string().min(1, 'La ciudad es obligatoria.'),
  region: z.string().min(1, 'La región es obligatoria.'),
  postalCode: z.string().min(1, 'El codigo postal es obligatorio.'),
})

type FormValues = z.infer<typeof personalInfoSchema>

export default function Address({
  next,
  setData,
  ...props
}: StepProps): JSX.Element {
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
      country:
        fullUserData?.billing?.country ??
        fullUserData?.countryOfResidence ??
        'ES',
      address1: fullUserData?.billing?.address1 ?? '',
      address2: fullUserData?.billing?.address2 ?? '',
      city: fullUserData?.billing?.city ?? '',
      region: fullUserData?.billing?.region ?? '',
      postalCode: fullUserData?.billing?.postalCode ?? '',
    },
  })

  const onSubmit = (formValues: FormValues): void => {
    setData(
      (data: KYCData): AddressStep =>
        data?.step === 'personal-info' || data?.step === 'address'
          ? {
              ...data,
              ...formValues,
              step: 'address',
            }
          : {
              step: 'address',
              ...formValues,
              birthDate: '',
              countryOfResidence: '',
              email: '',
              lastName: '',
              name: '',
              nationality: '',
            }
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
          Necesitamos tu dirección para poder verificar tu identidad.
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
          <FormElement label="Linea 1">
            <Input
              nativePlaceholder="Avenida Calcuta 34, Planta 2 Izquierda"
              keepErrorSpace
              autoComplete="address-line1"
              error={errors.address1}
              {...register('address1', {
                onChange: () => {
                  clearErrors('address1')
                },
              })}
            />
          </FormElement>

          <FormElement label="Linea 2">
            <Input
              nativePlaceholder="Calle General del Rosario 24, Escalera 2"
              keepErrorSpace
              autoComplete="address-line2"
              error={errors.address2}
              {...register('address2', {
                onChange: () => {
                  clearErrors('address2')
                },
              })}
            />
          </FormElement>
        </FieldSet>

        <FieldSet>
          <FormElement label="País">
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
          </FormElement>

          <FormElement label="Ciudad">
            <Input
              nativePlaceholder="Madrid"
              keepErrorSpace
              error={errors.city}
              {...register('city', {
                onChange: () => {
                  clearErrors('city')
                },
              })}
            />
          </FormElement>

          <FormElement label="Región">
            <Input
              nativePlaceholder="Madrid"
              keepErrorSpace
              error={errors.region}
              {...register('region', {
                onChange: () => {
                  clearErrors('region')
                },
              })}
            />
          </FormElement>

          <FormElement label="Código postal">
            <Input
              nativePlaceholder="28001"
              keepErrorSpace
              error={errors.postalCode}
              {...register('postalCode', {
                onChange: () => {
                  clearErrors('postalCode')
                },
              })}
            />
          </FormElement>
        </FieldSet>
      </div>
    </TabContent>
  )
}
