import App from '@components/App'
import styled from 'styled-components'
import { sizes } from '@config/theme'
import normalize from '@util/normailize'
import Card from '@components/Card'
import { useRouter } from 'next/router'
import { Flex, Img, Input, Title } from '@ui'
import type { SchoolWithDegree, UniversityWithSchools } from 'types/api'
import useSearchQuery from '@hooks/useSearchQuery'

const SchoolDiv = styled.div`
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
  grid-template-columns: max(10vw, 5rem) auto auto;
  align-items: center;
  gap: 2rem;
  margin: 0 0 2rem 0;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: max(10vw, 5rem) auto auto;
    justify-items: center;
    gap: 1rem;
    text-align: center;
  }
`

const StyledFlex = styled(Flex)`
  @media (max-width: 500px) {
    align-items: center;
  }
`

interface SchoolParams extends SchoolWithDegree {
  university: UniversityWithSchools
}

export default function SchoolPage({
  school,
}: {
  school: SchoolParams
}): JSX.Element {
  const { searchQuery, handleQueryChange } = useSearchQuery()
  const { asPath } = useRouter()

  return (
    <App>
      <SchoolDiv>
        <TitleDiv>
          <Img
            src={school.university.logoUrl}
            width="max(10vw, 5rem)"
            height="max(10vw, 5rem)"
            alt={`Logo ${school.university.name}`}
          />

          <StyledFlex>
            <Title
              fontSize="max(3vw, 1.8rem)"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              {school.name}
            </Title>

            <Title fontSize="max(2.5vw, 1.5rem)" fontFamily="HelveticaRounded">
              {school.university.name}
            </Title>
          </StyledFlex>
        </TitleDiv>
        <Input onChange={handleQueryChange} placeholder="Buscar carrera" />

        {school.degrees.map(degree => {
          if (normalize(degree.name).includes(searchQuery)) {
            return (
              <Card
                key={degree.id}
                href={`${asPath}/${degree.id}`}
                img="/icons/university.svg"
                text={degree.name}
              />
            )
          }
          return undefined
        })}
      </SchoolDiv>
    </App>
  )
}
