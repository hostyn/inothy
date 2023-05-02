import normalize from '@util/normailize'
import { useEffect, useState } from 'react'
import Card, { CardImg, CardText } from './components/Card'
import Cards from './components/Cards'
import { getUniversities } from '@util/api'
import { Input } from '@ui'
import FormBody from './components/FormBody'
import type { CompleteProfileBaseProps } from '.'
import type { University as UniversityType } from 'types/api'
import type { ChangeHandler } from 'react-hook-form'
import Loading from '@components/Loading'

export default function University({
  userData,
  setUserData,
  setState,
}: CompleteProfileBaseProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('')
  const [selected, setSelected] = useState({
    university: userData.university,
    universityName: userData.universityName,
  })
  const [error, setError] = useState<
    { type: 'required'; message: string } | undefined
  >(undefined)
  const [universities, setUniversities] = useState<UniversityType[] | null>(
    null
  )

  const handleChange: ChangeHandler = async ({ target }) => {
    setSearchQuery(normalize(target.value))
  }

  const onSubmit = (e: React.ChangeEvent): void => {
    e.preventDefault()
    if (selected.university == null) {
      setError({
        type: 'required',
        message: 'Debes seleccionar una universidad.',
      })
      return
    }

    setUserData(userData => ({ ...userData, ...selected }))
    setState('school')
  }

  useEffect(() => {
    getUniversities()
      .then(universities => {
        setUniversities(universities)
      })
      .catch(() => {})
  }, [])

  return (
    <FormBody
      title="Universidad"
      onBack={() => {
        setState('personalData')
      }}
      handleSubmit={onSubmit}
    >
      <Input
        onChange={handleChange}
        placeholder="Busca tu universidad"
        error={error}
      />
      <Cards>
        {universities == null ? (
          <Loading />
        ) : (
          universities.map(university => {
            if (
              normalize(university.name).includes(searchQuery) ||
              normalize(university.symbol).includes(searchQuery)
            ) {
              return (
                <Card
                  key={university.id}
                  selected={selected.university === university.id}
                  onClick={() => {
                    setError(undefined)
                    setSelected({
                      university: university.id,
                      universityName: university.name,
                    })
                  }}
                >
                  <CardImg src={university.logoUrl} />
                  <CardText>{university.name}</CardText>
                </Card>
              )
            }
            return undefined
          })
        )}
      </Cards>
    </FormBody>
  )
}
