import App from '../components/App'
import styled from 'styled-components'
import { colors, sizes } from '../config/theme'
import Text from '@ui/Text'
import Img from '@ui/Img'
import { useState } from 'react'
import Link from 'next/link'
import Loading from '../components/Loading'
import { getSubject } from '../util/api'
import Button from '@ui/Button'
import { useAuth } from '../context/authContext'
import A from '@ui/A'
import DocumentGridCard from '../components/DocumentGridCard'

const DegreeDiv = styled.div`
  display: flex;
  flex-direction: column;
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
  grid-template-columns: 13vw auto;
  align-items: center;
  gap: 2rem;
  margin: 0 0 0 0;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 5rem auto;
    justify-items: center;
  }
`

const Logo = styled(Img)`
  aspect-ratio: 1;
  width: 13vw;
  height: 13vw;

  @media (max-width: 500px) {
    width: 5rem;
    height: 5rem;
  }
`

const TitleText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1.7rem;
  }

  @media (max-width: 500px) {
    font-size: 1.8rem;

    text-align: center;
  }
`

const SubtitleText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1.3rem;
  }

  @media (max-width: 500px) {
    font-size: 1.5rem;
    text-align: center;
  }
`

const SubsubtitleText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1.2rem;
  }

  @media (max-width: 500px) {
    font-size: 1.2rem;
    text-align: center;
  }
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const YearSelector = styled.div`
  display: grid;
  border-radius: 9999999px;
  background-color: ${colors.disabledBackground};
  margin: 1rem auto;
  gap: 0.5rem;

  ${(props) => `
  grid-template-columns: repeat(${props.years}, 2.5rem);

  `};
`

const YearButton = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  color: ${(props) => (props.selected ? colors.white : 'inherit')};
  background-color: ${(props) =>
    props.selected ? colors.primary : 'transparent'};
  border-radius: 999999px;
  cursor: pointer;
  user-select: none;
  transition: 0.2s;

  :hover {
    ${(props) =>
      props.selected ? 'initial' : `background-color: ${colors.hover}`};
  }
`

const LoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-template-rows: auto;
  gap: 2rem;
  justify-items: center;
  margin: 0 0 1rem 0;
`

const SubjectTitle = styled(A)`
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export default function DegreePage ({ degree }) {
  const { user } = useAuth()
  const [yearSelected, setYearSelected] = useState(1)
  const [yearPage, setYearPage] = useState({
    1: loadDocs(degree.subjects.filter((subject) => subject.year === 1))
  })

  function loadDocs (subjects) {
    return subjects
      .map((subject) => ({
        ...subject,
        docs: subject.docs.filter((doc) => doc.createdBy !== user?.uid)
      }))
      .filter((subject) => subject.docs.length)
      .map((subject) => (
        <div
          key={subject.id}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Link href={`/subject/${subject.id}`} passHref>
            <SubjectTitle
              fontSize="2rem"
              fontWeight="bold"
              margin="0 0 1rem 0"
              color="primary"
              width="fit-content"
            >
              {subject.name} {subject.code && `(${subject.code})`}
            </SubjectTitle>
          </Link>
          <CardGrid>
            {subject.docs.map((doc) => (
              <DocumentGridCard
                key={doc.id}
                href={`/subject/${subject.id}/${doc.id}`}
                documentData={doc}
              />
            ))}
          </CardGrid>
        </div>
      ))
  }

  const handleClick = async (year) => {
    setYearSelected(year)
    if (
      !(
        yearPage[year] == null
      )
    ) { return }

    const subjectsPromises = degree.subjects
      .filter((subject) => subject.year === year)
      .map((subject) => getSubject(subject.id))

    const subjectsData = await Promise.all(subjectsPromises)
    setYearPage((yearPage) => ({
      ...yearPage,
      [year]: loadDocs(subjectsData)
    }))
  }

  return (
    <App>
      <DegreeDiv>
        <Title>
          <Logo src={degree.university.logoUrl} />
          <FlexColumn>
            <TitleText
              fontSize="3vw"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              {degree.name}
            </TitleText>
            <SubtitleText fontSize="2vw" fontFamily="HelveticaRounded">
              {degree.school.name}
            </SubtitleText>
            <SubsubtitleText fontSize="1.5vw" fontFamily="HelveticaRounded">
              {degree.university.name}
            </SubsubtitleText>
          </FlexColumn>
        </Title>
        <YearSelector years={degree.years}>
          {[...Array(degree.years).keys()].map((year) => (
            <YearButton
              key={year + 1}
              selected={year + 1 === yearSelected}
              value={year + 1}
              onClick={() => handleClick(year + 1)}
            >
              {year + 1}º
            </YearButton>
          ))}
        </YearSelector>
        {!yearPage[yearSelected]
          ? (
          <LoadingDiv>
            <Loading />
          </LoadingDiv>
            )
          : !yearPage[yearSelected].length
              ? (
          <>
            <Text textAlign="center" fontSize="1.5rem" margin="2rem 0 1rem 0">
              Todavía no se han subido documentos de este curso.
            </Text>
            <Text
              textAlign="center"
              fontSize="2rem"
              color="secondary"
              fontFamily="HelveticaRounded"
            >
              ¡Sé el primero!
            </Text>
            <Link href="/upload" passHref>
              <Button margin="1rem auto" padding="0.5rem 1rem">
                Subir documentos
              </Button>
            </Link>
          </>
                )
              : (
                  yearPage[yearSelected]
                )}
      </DegreeDiv>
    </App>
  )
}
