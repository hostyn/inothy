import Menu from '../../components/Account/Menu'
import App from '../../components/App'
import styled from 'styled-components'
import { colors, sizes } from '../../config/theme'
import Text from '@ui/Text'
import Img from '@ui/Img'
import Input from '@ui/Input'
import Textarea from '../../components/ui/Textarea'
import { useAuth } from '../../context/authContext'
import { useEffect, useState } from 'react'
import Select from '@ui/Select'
import { getSchool, getUniversities, getUniversity } from '../../util/api'
import { BadgesNames } from '../../config/constants'

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

const University = styled.div`
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const Badges = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  gap: 1rem;
`

const Title = styled(Text)`
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const StyledImg = styled(Img)`
  @media (max-width: 768px) {
    height: 4rem;
    width: 4rem;
  }
`

export default function ProfileView () {
  const { user } = useAuth()
  const [userData, setUserData] = useState({
    name: user.data.name,
    surname: user.data.surname
  })

  const [data, setData] = useState({
    universities: null,
    schools: null,
    degrees: null
  })

  const handleChange = ({ target }) => {
    setUserData({ ...userData, [target.name]: target.value })
  }

  useEffect(() => {
    getUniversities().then((res) =>
      setData((data) => ({ ...data, universities: res }))
    )

    getUniversity(user.data.university).then((res) =>
      setData((data) => ({ ...data, schools: res.schools }))
    )

    getSchool(user.data.university, user.data.school).then((res) =>
      setData((data) => ({ ...data, degrees: res.degrees }))
    )
  }, [])

  return (
    <App>
      <Menu profile>
        <ProfileGrid>
          <ProfileBox girdColumn="1" gridRow="1 / 3">
            <Header>
              <Title
                fontSize="2.5rem"
                color="secondary"
                fontWeight="bold"
                fontFamily="HelveticaRounded"
              >
                Info. Personal
              </Title>
              <StyledImg
                src="/icons/profile.svg"
                aspectRatio="1"
                height="6rem"
                width="6rem"
              />
            </Header>
            <InputDiv>
              <Subtitle fontSize="1.5rem" margin="0 0 0.5rem 0">
                Nombre
              </Subtitle>
              <Input
                name="name"
                value={userData.name}
                onChange={handleChange}
                disabled
              />
            </InputDiv>
            <InputDiv>
              <Subtitle fontSize="1.5rem" margin="0.7rem 0 0.5rem 0">
                Apellidos
              </Subtitle>
              <Input
                name="surname"
                value={userData.surname}
                onChange={handleChange}
                disabled
              />
            </InputDiv>
            <InputDiv>
              <Subtitle fontSize="1.5rem" margin="0.7rem 0 0.5rem 0">
                Correo electrónico
              </Subtitle>
              <Input name="name" disabled value={user.email} />
            </InputDiv>
            <InputDiv>
              <Subtitle fontSize="1.5rem" margin="0.7rem 0 0.5rem 0">
                Biografía
              </Subtitle>
              <Textarea
                name="name"
                rows="4"
                disabled
                value={user.data.biography}
              />
            </InputDiv>
          </ProfileBox>
          <University>
            <Title
              fontSize="2.5rem"
              color="secondary"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              Universidad
            </Title>
            <Select value={user.data.university} disabled>
              {data.universities &&
                data.universities.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name}
                  </option>
                ))}
            </Select>
            <Select value={user.data.school} disabled>
              {data.schools &&
                data.schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
            </Select>
            <Select value={user.data.degree} disabled>
              {data.degrees &&
                data.degrees.map((degree) => (
                  <option key={degree.id} value={degree.id}>
                    {degree.name}
                  </option>
                ))}
            </Select>
          </University>
          <BadgesDiv>
            <Title
              fontSize="2.5rem"
              color="secondary"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              Insignias
            </Title>
            {user.data.badge.length
              ? (
              <Badges>
                {user.data.badge.map((badge) => (
                  <Img
                    key={badge}
                    title={BadgesNames[badge]}
                    src={`/badge/${badge}.svg`}
                  />
                ))}
              </Badges>
                )
              : (
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
