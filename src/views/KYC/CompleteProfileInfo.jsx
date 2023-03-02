import { useState } from 'react'
import styled from 'styled-components'
import Input from '@ui/Input'
import Text from '@ui/Text'
import Select from '@ui/Select'
import countries from '../../config/countries'
import Button from '@ui/Button'
import { colors } from '../../config/theme'
import getAge from '../../util/getAge'

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
  'Diciembre'
]

const CompleteProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  max-width: 100%;
`

const InputDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 3rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`

const TitleAndInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0 0;
`

const BirthDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const InlineText = styled.div`
  display: flex;
  gap: 1rem;
`

const range = (size, start = 1) => {
  return [...Array(size).keys()].map((x) => x + start)
}

const daysInMonth = (y, m) => new Date(parseInt(y), parseInt(m), 0).getDate()

export default function CompleteProfileInfo ({
  setUserData,
  userData,
  setState
}) {
  const [error, setError] = useState({
    name: null,
    surname: null,
    email: null,
    address1: null,
    address2: null,
    city: null,
    region: null,
    postalCode: null
  })

  const [birthDate, setBirthDate] = useState({
    day: new Date(parseInt(userData.birthday) * 1000).getUTCDate(),
    month: new Date(parseInt(userData.birthday) * 1000).getUTCMonth() + 1,
    year: new Date(parseInt(userData.birthday) * 1000).getUTCFullYear()
  })

  const handleDate = ({ target }) => {
    if (target.name === 'day') {
      setBirthDate((date) => ({
        ...date,
        day: target.value
      }))
      return
    }

    const days = daysInMonth(
      target.name === 'year' ? target.value : birthDate.year,
      target.name === 'month' ? target.value : birthDate.month
    )

    setBirthDate((date) => ({
      ...date,

      [target.name]: target.value,
      day: parseInt(date.day) > days ? days : date.day
    }))
  }

  const handleChange = ({ target }) => {
    setUserData((data) => ({ ...data, [target.name]: target.value }))
  }

  const verifyData = () => {
    // TODO: comprobar que es mayor de edad
    let anyError = false
    // NAME
    if (userData.name.length === 0) {
      setError((error) => ({ ...error, name: 'No puede estar vacío' }))
      anyError = true
    } else if (
      !userData.name.match(/^[\w'\-,.]*[^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/)
    ) {
      setError((error) => ({ ...error, name: 'No es válido' }))
      anyError = true
    }
    // SURNAME
    if (userData.surname.length === 0) {
      setError((error) => ({ ...error, surname: 'No puede estar vacío' }))
      anyError = true
    } else if (
      !userData.surname.match(
        /^[\w'\-,.]*[^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/
      )
    ) {
      setError((error) => ({ ...error, surname: 'No es válido' }))
      anyError = true
    }

    if (userData.address1.length === 0) {
      setError((error) => ({ ...error, address1: 'No puede estar vacía' }))
      anyError = true
    }
    if (userData.city.length === 0) {
      setError((error) => ({ ...error, city: 'No puede estar vacía' }))
      anyError = true
    }
    if (userData.postalCode.length === 0) {
      setError((error) => ({ ...error, postalCode: 'No puede estar vacío' }))
      anyError = true
    }
    if (userData.region.length === 0) {
      setError((error) => ({ ...error, region: 'No puede estar vacía' }))
      anyError = true
    }

    if (
      getAge(new Date(birthDate.year, birthDate.month - 1, birthDate.day + 1)) <
      18
    ) {
      setError((error) => ({ ...error, age: 'Debes ser mayor de edad' }))
      anyError = true
    }
    return anyError
  }

  const handleSubmit = async () => {
    setError({
      name: null,
      surname: null,
      email: null,
      address1: null,
      address2: null,
      city: null,
      region: null,
      postalCode: null
    })
    const error = verifyData()
    if (error) return

    const birthday =
      new Date(
        birthDate.year,
        birthDate.month - 1,
        birthDate.day + 1
      ).getTime() / 1000

    setUserData((userData) => ({
      ...userData,
      birthday
    }))
    setState('uploadaccepted')
  }

  return (
    <CompleteProfileInfoDiv>
      <Text fontSize="3rem">Completa tu perfil</Text>
      <Text>
        Para que puedas retirar tu saldo necesitamos verificar tu identidad.
      </Text>
      <InputDiv>
        <TitleAndInput>
          <InlineText>
            <Text>Nombre</Text>
            {error.name && <Text color="secondary">{error.name}</Text>}
          </InlineText>
          <Input
            name="name"
            value={userData.name}
            onChange={handleChange}
            border={
              error.name
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
        </TitleAndInput>
        <TitleAndInput>
          <InlineText>
            <Text>Apellidos</Text>
            {error.surname && <Text color="secondary">{error.surname}</Text>}
          </InlineText>
          <Input
            name="surname"
            value={userData.surname}
            onChange={handleChange}
            border={
              error.surname
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
        </TitleAndInput>
        <TitleAndInput>
          <InlineText>
            <Text>Fecha de nacimiento</Text>
            {error.age && <Text color="secondary">{error.age}</Text>}
          </InlineText>
          <BirthDiv>
            <Select
              name="year"
              onChange={handleDate}
              value={birthDate.year}
              border={
                error.age
                  ? `2px solid ${colors.secondary}`
                  : `2px solid ${colors.primary}`
              }
            >
              {range(101, new Date().getFullYear() - 100)
                .reverse()
                .map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
            </Select>
            <Select
              name="month"
              onChange={handleDate}
              value={birthDate.month}
              border={
                error.age
                  ? `2px solid ${colors.secondary}`
                  : `2px solid ${colors.primary}`
              }
            >
              {months.map((value, index) => (
                <option key={index + 1} value={index + 1}>
                  {value}
                </option>
              ))}
            </Select>
            <Select
              name="day"
              onChange={handleDate}
              value={birthDate.day}
              border={
                error.age
                  ? `2px solid ${colors.secondary}`
                  : `2px solid ${colors.primary}`
              }
            >
              {range(
                parseInt(daysInMonth(birthDate.year, birthDate.month))
              ).map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Select>
          </BirthDiv>
        </TitleAndInput>
        <TitleAndInput>
          <Text>Email</Text>
          <Input name="email" value={userData.email} disabled />
        </TitleAndInput>
        <TitleAndInput>
          <InlineText>
            <Text>Dirección 1</Text>
            {error.address1 && <Text color="secondary">{error.address1}</Text>}
          </InlineText>
          <Input
            name="address1"
            value={userData.address1}
            onChange={handleChange}
            border={
              error.address1
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
        </TitleAndInput>
        <TitleAndInput>
          <InlineText>
            <Text>Dirección 2</Text>
            {error.address2 && <Text color="secondary">{error.address2}</Text>}
          </InlineText>
          <Input
            name="address2"
            value={userData.address2}
            onChange={handleChange}
            border={
              error.address2
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
        </TitleAndInput>
        <TitleAndInput>
          <InlineText>
            <Text>Ciudad</Text>
            {error.city && <Text color="secondary">{error.city}</Text>}
          </InlineText>
          <Input
            name="city"
            value={userData.city}
            onChange={handleChange}
            border={
              error.city
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
        </TitleAndInput>
        <TitleAndInput>
          <InlineText>
            <Text>Provincia</Text>
            {error.region && <Text color="secondary">{error.region}</Text>}
          </InlineText>
          <Input
            name="region"
            value={userData.region}
            onChange={handleChange}
            border={
              error.region
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
        </TitleAndInput>
        <TitleAndInput>
          <InlineText>
            <Text>Código postal</Text>
            {error.postalCode && (
              <Text color="secondary">{error.postalCode}</Text>
            )}
          </InlineText>
          <Input
            name="postalCode"
            value={userData.postalCode}
            onChange={handleChange}
            border={
              error.postalCode
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
        </TitleAndInput>
        <TitleAndInput>
          <Text>País</Text>
          <Input name="country" value="España" disabled />
        </TitleAndInput>
        <TitleAndInput>
          <Text>Nacionalidad</Text>
          <Select
            maxWidth="calc(100vw - 6rem)"
            name="nationality"
            onChange={handleChange}
            value={userData.nationality}
          >
            {countries.map((country) => (
              <option key={country.iso} value={country.iso}>
                {country.name}
              </option>
            ))}
          </Select>
        </TitleAndInput>
        <TitleAndInput>
          <Text>País de residencia</Text>
          <Input name="countryOfResidence" value="España" disabled />
        </TitleAndInput>
      </InputDiv>
      <Button margin="1rem 0 0 auto" padding="10px 1rem" onClick={handleSubmit}>
        Siguiente
      </Button>
    </CompleteProfileInfoDiv>
  )
}
