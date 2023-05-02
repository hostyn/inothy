import { Input } from '@ui'
import FormBody from './components/FormBody'
import type { CompleteProfileBaseProps } from '.'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

interface FormValues {
  name: string
  surname: string
  address1: string
  address2: string
  city: string
  postalCode: string
  region: string
}

export default function PersonalData({
  userData,
  setUserData,
  setState,
}: CompleteProfileBaseProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setFocus,
  } = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      address1: userData.address1,
      address2: userData.address2,
      name: userData.name,
      surname: userData.surname,
      city: userData.city,
      postalCode: userData.postalCode,
      region: userData.region,
    },
  })

  const onSubmit = (values: FormValues): void => {
    setUserData(userData => ({
      ...userData,
      ...values,
      personalDataCompleted: true,
    }))
    setState('university')
  }

  useEffect(() => {
    setFocus('name')
  }, [])

  return (
    <FormBody
      title="Información personal"
      handleSubmit={handleSubmit(onSubmit)}
      onBack={() => {
        setState('completeProfile')
      }}
    >
      <Grid>
        <Input
          placeholder="Nombre"
          {...register('name', {
            required: 'El nombre es obligatorio.',
            pattern: {
              value: /^[\w'\-,.]*[^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/,
              message: 'En nombre no es válido.',
            },
            onChange: () => {
              clearErrors('name')
            },
          })}
          error={errors.name}
        />

        <Input
          placeholder="Apellidos"
          {...register('surname', {
            required: 'Los apellidos son obligatorios.',
            pattern: {
              value: /^[\w'\-,.]*[^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/,
              message: 'Los apellidos no son válidos.',
            },
            onChange: () => {
              clearErrors('surname')
            },
          })}
          error={errors.surname}
        />

        <Input
          placeholder="Dirección 1"
          {...register('address1', {
            required: 'La dirección 1 es obligatoria.',
            onChange: () => {
              clearErrors('address1')
            },
          })}
          error={errors.address1}
        />

        <Input
          placeholder="Dirección 2"
          {...register('address2', {
            onChange: () => {
              clearErrors('address2')
            },
          })}
          error={errors.address2}
        />

        <Input
          placeholder="Ciudad"
          {...register('city', {
            required: 'La ciudad es obligatoria.',
            onChange: () => {
              clearErrors('city')
            },
          })}
          error={errors.city}
        />

        <Input
          placeholder="Código postal"
          {...register('postalCode', {
            required: 'El código postal es obligatorio.',
            onChange: () => {
              clearErrors('postalCode')
            },
          })}
          error={errors.postalCode}
        />

        <Input
          placeholder="Provincia"
          {...register('region', {
            required: 'La provincia es obligatoria.',
            onChange: () => {
              clearErrors('region')
            },
          })}
          error={errors.region}
        />

        <Input placeholder="País" value="Esapaña" disabled />
      </Grid>
    </FormBody>
  )
}
