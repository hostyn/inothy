import { COUNTRIES } from '@config/countries'
import { zodResolver } from '@hookform/resolvers/zod'
import { css } from '@styled-system/css'
import Input from '@ui/Input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import TabContent from '../TabContent'
import type { StepProps } from '../types'

const personalInfoSchema = z.object({
  address1: z.string().min(1, 'La linea 1 es obligatoria.'),
  address2: z.string(),
  country: z.string(),
  city: z.string().min(1, 'La ciudad es obligatoria.'),
  region: z.string().min(1, 'La región es obligatoria.'),
  postalCode: z.string().min(1, 'El codigo postal es obligatorio.'),
})

type FormValues = z.infer<typeof personalInfoSchema>

export default function Address({
  next,
  value,
  title,
  prev,
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
      country: 'ES',
      address1: '',
      address2: '',
      city: '',
      region: '',
      postalCode: '',
    },
  })

  const onSubmit = (values: FormValues): void => {}

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
              error={errors.address1}
              {...register('address1', {
                onChange: () => {
                  clearErrors('address1')
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
              error={errors.address2}
              {...register('address2', {
                onChange: () => {
                  clearErrors('address2')
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
