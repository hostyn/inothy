import App from '../components/App'
import styled from 'styled-components'
import { sizes } from '../config/theme'
import Img from '@ui/Img'
import Text from '@ui/Text'
import Input from '@ui/Input'
import { useState } from 'react'
import normalize from '../util/normailize'
import { useRouter } from 'next/router'
import Card from '../components/Card'

const UniversityDiv = styled.div`
  margin: 2rem calc(${sizes.inlineMargin} * 2);

  @media (max-width: 1500px) {
    margin: 2rem ${sizes.inlineMargin};
  }

  @media (max-width: 1000px) {
    margin: 2rem;
  }
`

const Title = styled.div`
  display: grid;
  grid-template-columns: 10vw auto;
  align-items: center;
  gap: 2rem;
  margin: 0 0 2rem 0;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 5rem auto;
    justify-items: center;
  }
`

const TitleText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 2rem;
  }

  @media (max-width: 500px) {
    text-align: center;
  }
`

const Logo = styled(Img)`
  aspect-ratio: 1;
  width: 10vw;
  height: 10vw;

  @media (max-width: 500px) {
    width: 5rem;
    height: 5rem;
  }
`

export default function UniversityPage ({ university }) {
  const [searchQuery, setSearchQuery] = useState('')
  const { asPath } = useRouter()

  const handleQuerySearch = ({ target }) => {
    setSearchQuery(target.value)
  }

  return (
    <App>
      <UniversityDiv>
        <Title>
          <Logo src={university.logoUrl} />
          <TitleText
            fontSize="4vw"
            fontWeight="bold"
            fontFamily="HelveticaRounded"
          >
            {university.name}
          </TitleText>
        </Title>
        <Input
          margin=" 0 0 2rem 0"
          onChange={handleQuerySearch}
          placeholder="Buscar facultad"
        />
        {university.schools &&
          university.schools.map((school) => {
            if (normalize(school.name).includes(searchQuery)) {
              return (
                <Card
                  key={school.id}
                  href={`${asPath}/${school.id}`}
                  img="/icons/university.svg"
                  text={school.name}
                />
              )
            }
          })}
      </UniversityDiv>
    </App>
  )
}
