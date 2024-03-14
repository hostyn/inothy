import { css } from '@styled-system/css'
import SectionLayout from '../layouts/SectionLayout'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { trpc } from '@services/trpc'
import { toastError, toastSuccess } from '@services/toaster'
import Spinner from '@components/Spinner'
import Input from '@ui/Input'
import { COUNTRIES } from '@config/countries'
import Select from '@ui/Select'

const inlineStyles = css({
  display: 'flex',
  gap: 'md',
  maxWidth: '3xl',
})

const biographySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  country: z.string(),
})

type FormValues = z.infer<typeof biographySchema>

export default function BillingInfo(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const utils = trpc.useContext()

  const { data: billingData } = trpc.auth.getBillingData.useQuery()

  const updateBillingData = trpc.auth.updateOrUpgradePayer.useMutation({
    onSuccess: async () => {
      await utils.auth.getBillingData.invalidate()
      toastSuccess('Datos de facturación actualizados con éxito.')
      setEditing(false)
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
    getValues,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(biographySchema),
    values: {
      firstName: billingData?.firstName ?? '',
      lastName: billingData?.lastName ?? '',
      address1: billingData?.address1 ?? '',
      address2: billingData?.address2 ?? '',
      city: billingData?.city ?? '',
      region: billingData?.region ?? '',
      postalCode: billingData?.postalCode ?? '',
      country: billingData?.country ?? '',
    },
  })

  const handleFormSubmit = handleSubmit(() => {
    setOpen(true)
  })

  const getBillingData = (): string => {
    const values = getValues()

    return `${values.firstName} ${values.lastName}
${values.address1}${values.address2 != null ? `, ${values.address2}` : ''}
${values.city}, ${values.region}, ${values.postalCode}, ${
      COUNTRIES.find(country => country.iso === values.country)?.name ?? ''
    }`
  }

  const onSubmit = async (): Promise<void> => {
    const values = getValues()
    updateBillingData.mutate(values)
  }

  return (
    <SectionLayout
      title="Datos de facturación"
      description="Actualiza tus datos de facturación para futuras compras."
      disabled={editing && updateBillingData.isLoading}
      bottomText=""
      buttonContent={
        editing ? (
          updateBillingData.isLoading ? (
            <Spinner className={css({ my: 'xs', mx: 'auto' })} />
          ) : (
            'Guardar cambios'
          )
        ) : (
          'Cambiar datos'
        )
      }
      dialogTitle={
        editing
          ? '¿Son correctos tus nuevos datos de facturación?'
          : '¿Cambiar datos de facturación?'
      }
      dialogDescription={
        editing
          ? getBillingData()
          : '¿Estas seguro que quieres cambiar tus datos de facturación?'
      }
      dialogOnConfirm={
        editing
          ? onSubmit
          : () => {
              setEditing(true)
            }
      }
      onSubmit={handleFormSubmit}
      open={open}
      onOpenChange={state => {
        if (!state) setOpen(false)
      }}
    >
      <div className={inlineStyles}>
        <Input
          placeholder="Nombre"
          disabled={!editing}
          error={errors.firstName}
          {...register('firstName', {
            onChange: () => {
              clearErrors('firstName')
            },
          })}
          className={css({
            width: '100%',
            mt: '6px',
            mb: errors.firstName != null ? '0' : '20px',
          })}
        />

        <Input
          placeholder="Apellidos"
          disabled={!editing}
          error={errors.lastName}
          {...register('lastName', {
            onChange: () => {
              clearErrors('lastName')
            },
          })}
          className={css({
            width: '100%',
            mt: '6px',
            mb: errors.lastName != null ? '0' : '20px',
          })}
        />
      </div>

      <Input
        placeholder="Linea 1"
        disabled={!editing}
        error={errors.address1}
        {...register('address1', {
          onChange: () => {
            clearErrors('address1')
          },
        })}
        className={css({
          width: '3xl',
          mt: '6px',
          mb: errors.address1 != null ? '0' : '20px',
        })}
      />

      <Input
        placeholder="Linea 2"
        disabled={!editing}
        error={errors.address2}
        {...register('address2', {
          onChange: () => {
            clearErrors('address2')
          },
        })}
        className={css({
          width: '3xl',
          mt: '6px',
          mb: errors.address2 != null ? '0' : '20px',
        })}
      />

      <div className={inlineStyles}>
        <Input
          placeholder="Ciudad"
          disabled={!editing}
          error={errors.city}
          {...register('city', {
            onChange: () => {
              clearErrors('city')
            },
          })}
          className={css({
            width: '100%',
            mt: '6px',
            mb: errors.city != null ? '0' : '20px',
          })}
        />

        <Input
          placeholder="Region"
          disabled={!editing}
          error={errors.region}
          {...register('region', {
            onChange: () => {
              clearErrors('region')
            },
          })}
          className={css({
            width: '100%',
            mt: '6px',
            mb: errors.region != null ? '0' : '20px',
          })}
        />
      </div>
      <div className={inlineStyles}>
        <Input
          placeholder="Codigo Postal"
          disabled={!editing}
          error={errors.postalCode}
          {...register('postalCode', {
            onChange: () => {
              clearErrors('postalCode')
            },
          })}
          className={css({
            width: '100%',
            mt: '6px',
            mb: errors.postalCode != null ? '0' : '20px',
          })}
        />

        <Select
          placeholder="País"
          disabled={!editing}
          defaultValue="ES"
          {...register('country', {
            onChange: () => {
              clearErrors('country')
            },
          })}
          className={css({
            width: '100%',
            mt: '6px',
            mb: errors.country != null ? '0' : '20px',
          })}
        >
          {COUNTRIES.map(country => (
            <option key={country.iso} value={country.iso}>
              {country.name}
            </option>
          ))}
        </Select>
      </div>
    </SectionLayout>
  )
}
