import Text from '../../components/Text'
import Input from '../../components/Input'
import normalize from '../../util/normailize'
import { useState } from 'react'
import Card, { CardImg, CardText } from './components/Card'
import Body from './components/Body'
import Cards from './components/Cards'
import ButtonGrid, { StyledButton } from './components/ButtonGrid'
import { getSchool } from '../../util/api'

export default function State3School ({
  schools,
  userData,
  setUserData,
  setState,
  setApiData
}) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = ({ target }) => {
    setSearchQuery(normalize(target.value))
  }

  const handleSubmit = () => {
    setState('degree')
  }

  return (
    <Body>
      <Text
        fontSize="3rem"
        fontWeight="bold"
        fontFamily="HelveticaRounded"
        textAlign="center"
      >
        Facultad
      </Text>
      <Input onChange={handleChange} placeholder="Busca tu facultad" />
      <Cards>
        {schools &&
          schools.map((school) => {
            if (normalize(school.name).includes(searchQuery)) {
              return (
                <Card
                  key={school.id}
                  selected={userData.school === school.id}
                  onClick={() => {
                    setApiData((apiData) => ({
                      ...apiData,
                      degree: null
                    }))
                    setUserData((data) => ({
                      ...data,
                      school: school.id,
                      schoolName: school.name,
                      degree: null,
                      degreeName: ''
                    }))
                    getSchool(userData.university, school.id).then((data) =>
                      setApiData((apiData) => ({
                        ...apiData,
                        degrees: data.degrees
                      }))
                    )
                  }}
                >
                  <CardImg src="/icons/university.svg" />
                  <CardText>{school.name}</CardText>
                </Card>
              )
            }
          })}
      </Cards>
      <ButtonGrid>
        <StyledButton onClick={() => setState('university')} back>
          Atrás
        </StyledButton>
        <StyledButton
          disabled={!userData.school}
          onClick={handleSubmit}
          gridColumn="2"
        >
          Siguiente
        </StyledButton>
      </ButtonGrid>
    </Body>
  )
}
