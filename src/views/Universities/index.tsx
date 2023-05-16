import App from '@components/App'
import styled from 'styled-components'
import { sizes } from '@config/theme'
import normalize from '@util/normailize'
import Card from '@components/Card'
import { Img, Input, Title } from '@ui'
import type { University } from 'types/api'
import useSearchQuery from '@hooks/useSearchQuery'

const UniversitiesDiv = styled.div`
  width: 100%;
  margin: 2rem calc(${sizes.inlineMargin} * 2);

  @media (max-width: 1500px) {
    margin: 2rem ${sizes.inlineMargin};
  }

  @media (max-width: 1000px) {
    margin: 2rem;
  }
`

const TitleDiv = styled.div`
  display: grid;
  grid-template-columns: max(10vw, 5rem) auto;
  align-items: center;
  gap: 2rem;
  margin: 0 0 2rem 0;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: max(10vw, 5rem) auto;
    justify-items: center;
    gap: 1rem;
  }
`

const UniversitiesMap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-direction: column;
  margin: 2rem 0;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`

interface UniversitiesProps {
  universities: University[]
}

export default function UniversitiesView({
  universities,
}: UniversitiesProps): JSX.Element {
  const { searchQuery, handleQueryChange } = useSearchQuery()

  return (
    <App>
      <UniversitiesDiv>
        <TitleDiv>
          <Img
            src="/icons/university.svg"
            priority
            width="max(10vw, 5rem)"
            height="max(10vw, 5rem)"
            alt="Logo Universidades"
          />
          <Title
            fontSize="max(3vw, 2rem)"
            color="secondary"
            fontWeight="bold"
            fontFamily="HelveticaRounded"
          >
            Universidades
          </Title>
        </TitleDiv>
        <Input onChange={handleQueryChange} placeholder="Buscar universidad" />
        <UniversitiesMap>
          {universities.map(uni => {
            if (
              normalize(uni.name).includes(searchQuery) ||
              normalize(uni.symbol).includes(searchQuery)
            ) {
              return (
                <Card
                  key={uni.id}
                  href={`/universities/${uni.id}`}
                  img={uni.logoUrl}
                  text={uni.name}
                />
              )
            }
            return undefined
          })}
        </UniversitiesMap>
      </UniversitiesDiv>
    </App>
  )
}
