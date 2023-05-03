import normalize from '@util/normailize'
import { useEffect, useState } from 'react'
import Card, { CardImg, CardText } from './components/Card'
import Cards from './components/Cards'
import { getUniversity } from '@util/api'
import { Input } from '@ui'
import FormBody from '@components/FormBody'
import type { CompleteProfileBaseProps } from '.'
import type { School as SchoolType } from 'types/api'
import type { ChangeHandler } from 'react-hook-form'
import Loading from '@components/Loading'

export default function School({
  userData,
  setUserData,
  setState,
}: CompleteProfileBaseProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('')
  const [selected, setSelected] = useState({
    school: userData.school,
    schoolName: userData.schoolName,
  })
  const [error, setError] = useState<
    { type: 'required'; message: string } | undefined
  >(undefined)
  const [schools, setSchools] = useState<SchoolType[] | null>(null)

  const handleChange: ChangeHandler = async ({ target }) => {
    setSearchQuery(normalize(target.value))
  }

  const onSubmit = (e: React.ChangeEvent): void => {
    e.preventDefault()
    if (selected.school == null) {
      setError({
        type: 'required',
        message: 'Debes seleccionar una facultad.',
      })
      return
    }

    setUserData(userData => ({ ...userData, ...selected }))
    setState('degree')
  }

  useEffect(() => {
    getUniversity(userData.university as string)
      .then(university => {
        setSchools(university.schools)
      })
      .catch(() => {})
  }, [])

  return (
    <FormBody
      title="Facultad"
      onBack={() => {
        setState('university')
      }}
      handleSubmit={onSubmit}
    >
      <Input
        onChange={handleChange}
        placeholder="Busca tu facultad"
        error={error}
      />
      <Cards>
        {schools == null ? (
          <Loading />
        ) : (
          schools.map(school => {
            if (normalize(school.name).includes(searchQuery)) {
              return (
                <Card
                  key={school.id}
                  selected={selected.school === school.id}
                  onClick={() => {
                    setError(undefined)
                    setSelected({
                      school: school.id,
                      schoolName: school.name,
                    })
                  }}
                >
                  <CardImg src="/icons/university.svg" />
                  <CardText>{school.name}</CardText>
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
