import normalize from '@util/normailize'
import { useEffect, useState } from 'react'
import Card, { CardImg, CardText } from './components/Card'
import Cards from './components/Cards'
import { completeProfile, getSchool } from '@util/api'
import { Input } from '@ui'
import FormBody from '@components/FormBody'
import type { CompleteProfileBaseProps } from '.'
import type { Degree as DegreeType } from 'types/api'
import type { ChangeHandler } from 'react-hook-form'
import Loading from '@components/Loading'
import { useAuth } from '@context/authContext'
import { useRouter } from 'next/router'

export default function Degree({
  userData,
  setUserData,
  setState,
}: CompleteProfileBaseProps): JSX.Element {
  const { updateData } = useAuth()
  const { push } = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selected, setSelected] = useState({
    school: userData.school,
    schoolName: userData.schoolName,
  })
  const [error, setError] = useState<
    { type: 'required'; message: string } | undefined
  >(undefined)
  const [degrees, setDegrees] = useState<DegreeType[] | null>(null)

  const handleChange: ChangeHandler = async ({ target }) => {
    setSearchQuery(normalize(target.value))
  }

  const onSubmit = async (e: React.ChangeEvent): Promise<void> => {
    e.preventDefault()
    setState('loading')
    try {
      await completeProfile({
        username: userData.username ,
        biography: userData.biography ,
        name: userData.name ,
        surname: userData.surname ,
        address1: userData.address1 ,
        address2: userData.address2 ,
        city: userData.city ,
        postalCode: userData.postalCode ,
        region: userData.region ,
        university: userData.university ,
        school: userData.school ,
        degree: selected.school ,
      })
      setState('success')
      await new Promise(resolve => setTimeout(resolve, 2000))
      await updateData()
      await push('/')
    } catch {
      setState('error')
    }
  }

  useEffect(() => {
    getSchool(userData.university , userData.school )
      .then(school => {
        setDegrees(school.degrees)
      })
      .catch(() => {})
  }, [])

  return (
    <FormBody
      title="Grado"
      onBack={() => {
        setState('university')
      }}
      handleSubmit={onSubmit}
      last
    >
      <Input
        onChange={handleChange}
        placeholder="Busca tu grado"
        error={error}
      />
      <Cards>
        {degrees == null ? (
          <Loading />
        ) : (
          degrees.map(degree => {
            if (normalize(degree.name).includes(searchQuery)) {
              return (
                <Card
                  key={degree.id}
                  selected={selected.school === degree.id}
                  onClick={() => {
                    setError(undefined)
                    setSelected({
                      school: degree.id,
                      schoolName: degree.name,
                    })
                  }}
                >
                  <CardImg src="/icons/university.svg" />
                  <CardText>{degree.name}</CardText>
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
