import { useEffect } from 'react'
import styled from 'styled-components'
import countries from '@config/countries'
import getAge from '@util/getAge'
import { Input, Select } from '@ui'
import { useForm } from 'react-hook-form'
import FormBody from '@components/FormBody'
import type { CountryISO } from 'mangopay2-nodejs-sdk'
import type { KYCBaseProps } from '.'

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const InputDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 3rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`

const BirthDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const range = (size: number, start = 1): number[] => {
  return [...Array(size)].map((_, x) => x + start)
}

const daysInMonth = (year: number, month: number): number[] => {
  const days = new Date(year, month, 0).getDate()
  return range(days, 1)
}

interface FormValues {
  name: string
  surname: string
  year: number
  month: number
  day: number
  email: string
  address1: string
  address2?: string
  region: string
  city: string
  postalCode: string
  country: 'ES'
  nationality: CountryISO
}

export default function CompleteProfileInfo({
  setUserData,
  userData,
  setState,
}: KYCBaseProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setFocus,
    watch,
  } = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      name: userData.name,
      surname: userData.surname,
      address1: userData.address1,
      address2: userData.address2,
      year: userData.year,
      month: userData.month,
      day: userData.day,
      email: userData.email,
      city: userData.city,
      region: userData.region,
      postalCode: userData.postalCode,
      nationality: userData.nationality,
    },
  })

  const onSubmit = async (values: FormValues): Promise<void> => {
    setUserData(userData => ({ ...userData, ...values }))
    setState('uploadaccepted')
  }

  useEffect(() => {
    setFocus('name')
  }, [])

  return (
    <FormBody
      title="Completa tu perfil"
      subtitle="Para que puedas retirar tu saldo necesitamos verificar tu identidad."
      handleSubmit={handleSubmit(onSubmit)}
    >
      <InputDiv>
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
        <BirthDiv>
          <Select
            placeholder="Año"
            {...register('year', {
              required: 'Es obligatorio.',
              onChange: () => {
                clearErrors(['year', 'month', 'day'])
              },
              validate: year => {
                const age = getAge(new Date(year, 0, 1))
                return age >= 18 ? undefined : 'Hay que ser mayor a 18'
              },
            })}
            error={errors.year}
          >
            {range(100, new Date().getFullYear() - 99).map(year => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Mes"
            {...register('month', {
              required: 'Es obligatorio.',
              onChange: () => {
                clearErrors(['month', 'day'])
              },
              validate: (month, values) => {
                if (errors.year != null) return
                const age = getAge(new Date(values.year, month, 1))
                return age >= 18 ? undefined : 'Hay que ser mayor a 18'
              },
            })}
            error={errors.month}
          >
            {range(12, 0).map(month => (
              <option key={month} value={month}>
                {months[month]}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Día"
            {...register('day', {
              required: 'Es obligatorio.',
              onChange: () => {
                clearErrors('day')
              },
              validate: (day, values) => {
                if (errors.year != null) return
                if (errors.month != null) return
                const age = getAge(new Date(values.year, values.month, day))
                return age >= 18 ? undefined : 'Hay que ser mayor a 18'
              },
            })}
            error={errors.day}
          >
            {daysInMonth(watch('year'), watch('month')).map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Select>
        </BirthDiv>

        <Input
          placeholder="Email"
          disabled
          {...register('email', {
            required: 'El nombre es obligatorio.',
            onChange: () => {
              clearErrors('email')
            },
          })}
          error={errors.email}
        />

        <Input
          placeholder="Dirección 1"
          {...register('address1', {
            required: 'La dirección es obligatoria.',
            onChange: () => {
              clearErrors('address1')
            },
          })}
          error={errors.address1}
        />

        <Input
          placeholder="Dirección 2"
          {...register('address2', {})}
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
          placeholder="Provincia"
          {...register('region', {
            required: 'La ciudad es obligatoria.',
            onChange: () => {
              clearErrors('region')
            },
          })}
          error={errors.region}
        />

        <Input
          placeholder="Código postal"
          {...register('postalCode', {
            required: 'La ciudad es obligatoria.',
            onChange: () => {
              clearErrors('postalCode')
            },
          })}
          error={errors.postalCode}
        />
        <Input placeholder="País" value="España" disabled />
        <Select
          placeholder="Nacionalidad"
          {...register('nationality', {
            required: 'La nacionalidad es obligatória.',
            onChange: () => {
              clearErrors('nationality')
            },
          })}
          error={errors.nationality}
        >
          {countries.map(country => (
            <option key={country.iso} value={country.iso}>
              {country.name}
            </option>
          ))}
        </Select>
        <Input
          placeholder="País de residencia"
          name="countryOfResidence"
          value="España"
          disabled
        />
      </InputDiv>
    </FormBody>
  )
}
