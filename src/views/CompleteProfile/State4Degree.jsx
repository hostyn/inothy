import Text from '@ui/Text'
import Input from '@ui/Input'

import normalize from '../../util/normailize'
import { useState } from 'react'
import Card, { CardImg, CardText } from './components/Card'
import Body from './components/Body'
import Cards from './components/Cards'
import ButtonGrid, { StyledButton } from './components/ButtonGrid'

export default function State4Degrees ({
  degrees,
  userData,
  setUserData,
  submit,
  setState
}) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = ({ target }) => {
    setSearchQuery(normalize(target.value))
  }

  return (
    <Body>
      <Text
        fontSize="3rem"
        fontWeight="bold"
        fontFamily="HelveticaRounded"
        textAlign="center"
      >
        Grado
      </Text>
      <Input onChange={handleChange} placeholder="Busca tu grado" />
      <Cards>
        {degrees &&
          degrees.map((degree) => {
            if (normalize(degree.name).includes(searchQuery)) {
              return (
                <Card
                  key={degree.id}
                  selected={userData.degree === degree.id}
                  onClick={() => {
                    setUserData((data) => ({
                      ...data,
                      degree: degree.id,
                      degreeName: degree.name
                    }))
                  }}
                >
                  <CardImg src="/icons/university.svg" />
                  <CardText>{degree.name}</CardText>
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
          disabled={!userData.degree}
          onClick={submit}
          gridColumn="2"
        >
          Finalizar
        </StyledButton>
      </ButtonGrid>
    </Body>
  )
}
