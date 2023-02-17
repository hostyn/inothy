import Input from '../../components/Input'
import normalize from '../../util/normailize'
import { useState } from 'react'
import Card, { CardImg, CardText } from './components/Card'
import Body from './components/Body'
import Cards from './components/Cards'
import ButtonGrid, { StyledButton } from './components/ButtonGrid'
import { getUniversity } from '../../util/api'
import HeaderTitle from './components/Title'

export default function State2University ({
  universities,
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
    setState('school')
  }

  return (
    <Body>
      <HeaderTitle>Universidad</HeaderTitle>
      <Input onChange={handleChange} placeholder="Busca tu universidad" />
      <Cards>
        {universities &&
          universities.map((uni) => {
            if (
              normalize(uni.name).includes(searchQuery) ||
              normalize(uni.symbol).includes(searchQuery)
            ) {
              return (
                <Card
                  key={uni.id}
                  selected={userData.university === uni.id}
                  onClick={() => {
                    setApiData((apiData) => ({
                      ...apiData,
                      schools: null,
                      degree: null
                    }))
                    setUserData((data) => ({
                      ...data,
                      university: uni.id,
                      universityName: uni.name,
                      school: null,
                      schoolName: '',
                      degree: null,
                      degreeName: ''
                    }))
                    getUniversity(uni.id).then((data) =>
                      setApiData((apiData) => ({
                        ...apiData,
                        schools: data.schools,
                        degrees: null
                      }))
                    )
                  }}
                >
                  <CardImg src={uni.logoUrl} />
                  <CardText>{uni.name}</CardText>
                </Card>
              )
            }
          })}
      </Cards>
      <ButtonGrid>
        <StyledButton onClick={() => setState('personalData')} back>
          Atrás
        </StyledButton>
        <StyledButton
          disabled={!userData.university}
          onClick={handleSubmit}
          gridColumn="2"
        >
          Siguiente
        </StyledButton>
      </ButtonGrid>
    </Body>
  )
}
