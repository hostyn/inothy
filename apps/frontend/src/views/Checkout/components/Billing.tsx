import Spinner from '@components/Spinner'
import { COUNTRIES } from '@config/countries'
import { zodResolver } from '@hookform/resolvers/zod'
import { toastError } from '@services/toaster'
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { Button } from '@ui/Button'
import Input from '@ui/Input'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'El nombre es obligatorio.'),
  lastName: z.string().min(1, 'El apellido es obligatorio.'),
  address1: z.string().min(1, 'La linea 1 es obligatoria.'),
  address2: z.string(),
  country: z.string().min(1, 'El país es obligatorio.'),
  city: z.string().min(1, 'La ciudad es obligatoria.'),
  region: z.string().min(1, 'La región es obligatoria.'),
  postalCode: z.string().min(1, 'El codigo postal es obligatorio.'),
})

type FormValues = z.infer<typeof personalInfoSchema>

export default function Billing(): JSX.Element {
  const [editing, setEditing] = useState(false)
  const { data: fullUserData } = trpc.auth.getUserFullData.useQuery()
  const tprcContext = trpc.useContext()

  const updateBilling = trpc.auth.updateOrUpgradePayer.useMutation({
    onSuccess: async () => {
      await Promise.all([
        tprcContext.auth.getUserFullData.invalidate(),
        tprcContext.auth.getUserData.invalidate(),
      ])
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(personalInfoSchema),
    values: {
      firstName:
        fullUserData?.billing?.firstName ?? fullUserData?.firstName ?? '',
      lastName: fullUserData?.billing?.lastName ?? fullUserData?.lastName ?? '',
      address1: fullUserData?.billing?.address1 ?? '',
      address2: fullUserData?.billing?.address2 ?? '',
      city: fullUserData?.billing?.city ?? '',
      region: fullUserData?.billing?.region ?? '',
      postalCode: fullUserData?.billing?.postalCode ?? '',
      country:
        fullUserData?.billing?.country ??
        fullUserData?.countryOfResidence ??
        'ES',
    },
  })

  const onCancel = (): void => {
    setEditing(false)
    reset()
  }

  const onSubmit = async (formValues: FormValues): Promise<void> => {
    try {
      await updateBilling.mutateAsync(formValues)
      setEditing(false)
    } catch {
      toastError(
        'Ha ocurrido un error al actualizar la dirección de facturación. Intentalo más tarde.'
      )
    }
  }

  return (
    <section
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'md',
      })}
    >
      <h2
        className={css({
          fontSize: 'lg',
          fontWeight: '700',
          color: 'text',
        })}
      >
        Dirección de facturación
      </h2>
      {!(fullUserData?.canBuy ?? false) || editing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FormElement label="Nombre">
              <Input
                nativePlaceholder="Rubén"
                keepErrorSpace
                autoComplete="given-name"
                error={errors.firstName}
                {...register('firstName', {
                  onChange: () => {
                    clearErrors('firstName')
                  },
                })}
              />
            </FormElement>

            <FormElement label="Apellido">
              <Input
                nativePlaceholder="Martínez"
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
          </FieldSet>
          <FieldSet>
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
          </FieldSet>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
            })}
          >
            <Button
              type="button"
              visual="secondary"
              disabled={updateBilling.isLoading}
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updateBilling.isLoading}
              className={css({
                width: '9ch',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              })}
            >
              {updateBilling.isLoading ? <Spinner /> : 'Guardar'}
            </Button>
          </div>
        </form>
      ) : (
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <p
            className={css({
              lineHeight: '120%',
            })}
          >
            {fullUserData?.billing?.firstName} {fullUserData?.billing?.lastName}
            ,
            <br />
            {fullUserData?.billing?.address1}
            {fullUserData?.billing?.address2 != null &&
              fullUserData?.billing?.address2.length > 0 &&
              `, ${fullUserData?.billing?.address2}`}
            ,
            <br />
            {fullUserData?.billing?.city}, {fullUserData?.billing?.region},{' '}
            {fullUserData?.billing?.postalCode},{' '}
            {
              COUNTRIES.find(
                country => country.iso === fullUserData?.billing?.country
              )?.name
            }
          </p>
          <Button
            onClick={() => {
              setEditing(true)
            }}
            className={css({
              ml: 'sm',
            })}
          >
            Editar
          </Button>
        </div>
      )}
    </section>
  )
}

const FormElement = ({
  label,
  children,
}: {
  label: string
  children: JSX.Element
}): JSX.Element => (
  <label
    className={css({
      display: 'flex',
      flexDirection: 'column',
      gap: 'xs',
      width: '100%',
    })}
  >
    <span
      className={css({
        fontSize: 'sm',
        fontWeight: '700',
        lineHeight: '100%',
        color: 'text',
      })}
    >
      {label}
    </span>
    {children}
  </label>
)

const FieldSet = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <fieldset
    className={css({
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '100%',
      gap: 'sm',
    })}
  >
    {children}
  </fieldset>
)
