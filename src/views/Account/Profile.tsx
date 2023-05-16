import App from '@components/App'
import Menu from './components/Menu'
import styled from 'styled-components'
import { colors, sizes } from '@config/theme'
import Textarea from '@components/ui/Textarea'
import { useAuth } from '@context/authContext'
import { useEffect, useState } from 'react'
import { getSchool, getUniversities, getUniversity } from '@util/api'
import { BADGE_NAMES } from '@config/constants'
import { Flex, Img, Input, Select, Text, Title } from '@ui'
import type { Degree, School, University } from 'types/api'

const ProfileGrid = styled.div`
  min-height: ${sizes.accountHeight};
  display: grid;

  max-width: calc(100vw - 24rem - ${sizes.inlineMargin} * 2);

  grid-template-columns: 55% 45%;
  grid-template-rows: 1fr 12rem;
  gap: 2rem;

  @media (max-width: 1500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 20rem 12rem;
  }

  @media (max-width: 1000px) {
    max-width: calc(100vw - 4rem);
  }
`

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  max-width: 100%;

  border-radius: 20px;
  border: 3px solid ${colors.primary};
  padding: 2rem 3rem;

  grid-column: 1;
  grid-row: 1 / 3;

  @media (max-width: 1500px) {
    grid-column: auto;
    grid-row: auto;
    max-width: inherit;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const UniversityDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 20px;
  border: 3px solid ${colors.primary};
  padding: 2rem 3rem;

  @media (max-width: 1500px) {
    grid-column: auto;
    grid-row: auto;
    max-width: inherit;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const BadgesDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 20px;
  border: 3px solid ${colors.primary};
  padding: 2rem 3rem;

  @media (max-width: 1500px) {
    grid-column: auto;
    grid-row: auto;
    max-width: inherit;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const Badges = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  gap: 1rem;
`

const StyledImg = styled(Img)`
  @media (max-width: 768px) {
    height: 4rem;
    width: 4rem;
  }
`

interface Data {
  universities: null | University[]
  schools: null | School[]
  degrees: null | Degree[]
}

export default function ProfileView(): JSX.Element {
  const { user } = useAuth()

  const [data, setData] = useState<Data>({
    universities: null,
    schools: null,
    degrees: null,
  })

  useEffect(() => {
    getUniversities()
      .then(res => {
        setData(data => ({ ...data, universities: res }))
      })
      .catch(() => {})

    getUniversity(user?.data?.university as string)
      .then(res => {
        setData(data => ({ ...data, schools: res.schools }))
      })
      .catch(() => {})

    getSchool(user?.data?.university as string, user?.data?.school as string)
      .then(res => {
        setData(data => ({ ...data, degrees: res.degrees }))
      })
      .catch(() => {})
  }, [])

  return (
    <App>
      <Menu selected="profile">
        <ProfileGrid>
          <ProfileBox>
            <Flex flexDirection="row" justifyContent="space-between">
              <Title
                fontSize="max(2rem, 2vw)"
                color="secondary"
                fontWeight="bold"
                fontFamily="HelveticaRounded"
              >
                Info. Personal
              </Title>
              <StyledImg
                src="/icons/profile.svg"
                aspectRatio="1"
                height="max(3rem, 3vw)"
                width="max(3rem, 3vw)"
              />
            </Flex>
            <Input placeholder="Nombre" value={user?.data?.name} disabled />
            <Input
              placeholder="Apellidos"
              value={user?.data?.surname}
              disabled
            />
            <Input
              placeholder="Correo Electrónico"
              disabled
              value={user?.email as string}
            />
            <Textarea
              placeholder="Biografía"
              rows={4}
              disabled
              value={user?.data?.biography}
            />
          </ProfileBox>
          <UniversityDiv>
            <Title
              fontSize="max(2rem, 2vw)"
              color="secondary"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              Universidad
            </Title>
            <Select
              placeholder="Universidad"
              value={user?.data?.university}
              disabled
            >
              {data.universities?.map(uni => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </Select>
            <Select placeholder="Facultad" value={user?.data?.school} disabled>
              {data.schools?.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </Select>
            <Select placeholder="Grado" value={user?.data?.degree} disabled>
              {data.degrees?.map(degree => (
                <option key={degree.id} value={degree.id}>
                  {degree.name}
                </option>
              ))}
            </Select>
          </UniversityDiv>
          <BadgesDiv>
            <Title
              fontSize="max(2rem, 2vw)"
              color="secondary"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              Insignias
            </Title>
            {user?.data?.badge != null && user?.data?.badge.length > 0 ? (
              <Badges>
                {user?.data?.badge.map(badge => (
                  <Img
                    key={badge}
                    title={BADGE_NAMES[badge]}
                    src={`/badge/${badge}.svg`}
                  />
                ))}
              </Badges>
            ) : (
              <Text fontSize="1.5rem" margin="auto" fontWeight="bold">
                Aún no tienes insignias
              </Text>
            )}
          </BadgesDiv>
        </ProfileGrid>
      </Menu>
    </App>
  )
}
