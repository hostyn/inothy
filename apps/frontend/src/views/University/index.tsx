import App from '@components/App'
import styled from 'styled-components'
import { sizes } from '@config/theme'
import normalize from '@util/normailize'
import { useRouter } from 'next/router'
import Card from '@components/Card'
import { Img, Input, Title } from '@ui'
import type { UniversityWithSchools } from 'types/api'
import useSearchQuery from '@hooks/useSearchQuery'

const UniversityDiv = styled.div`
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

    text-align: center;
  }
`

interface UniversityProps {
  university: UniversityWithSchools
}

export default function UniversityPage({
  university,
}: UniversityProps): JSX.Element {
  const { searchQuery, handleQueryChange } = useSearchQuery()
  const { asPath } = useRouter()

  return (
    <App>
      <UniversityDiv>
        <TitleDiv>
          <Img
            src={university.logoUrl}
            width="max(10vw, 5rem)"
            height="max(10vw, 5rem)"
            alt={`Logo ${university.name}`}
          />
          <Title
            fontSize="max(3vw, 2rem)"
            fontWeight="bold"
            fontFamily="HelveticaRounded"
          >
            {university.name}
          </Title>
        </TitleDiv>

        <Input onChange={handleQueryChange} placeholder="Buscar facultad" />

        {university.schools.map(school => {
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
          return undefined
        })}
      </UniversityDiv>
    </App>
  )
}
