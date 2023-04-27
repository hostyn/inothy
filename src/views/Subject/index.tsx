import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import App from '@components/App'
import DocumentGridCard from '@components/DocumentGridCard'
import Loading from '@components/Loading/Loading'
import { sizes } from '@config/theme'
import { getSubject } from '@util/api'
import { Button, Flex, Img, Text, Title } from '@ui'
import { type SubjectWithDocumentsAndUniveristy } from 'types/api'

const SubjectDiv = styled.div`
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

  @media (max-width: 1000px) {
    grid-template-columns: max(10vw, 5rem) 1fr;
    grid-template-rows: max(10vw, 5rem);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: max(10vw, 5rem) auto;
    justify-items: center;
  }
`

const StyledFlex = styled(Flex)`
  @media (max-width: 500px) {
    align-items: center;
    text-align: center;
  }
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-template-rows: auto;
  gap: 2rem;
  justify-items: center;
  margin: 0 0 1rem 0;
`

interface SubjectViewProps {
  subjectData: SubjectWithDocumentsAndUniveristy
}

export default function SubjectView({
  subjectData: initialSubjectData,
}: SubjectViewProps): JSX.Element {
  const [subjectData, setSubjectData] = useState(initialSubjectData)
  const [loading, setLoading] = useState(false)

  const observer = useRef<IntersectionObserver>()
  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return
      if (observer.current != null) observer.current.disconnect()
      observer.current = new IntersectionObserver(async entries => {
        if (entries[0].isIntersecting && subjectData.last != null) {
          setLoading(true)
          const data = await getSubject(subjectData.id, 25, subjectData.last)

          if (data.docs.length === 0) {
            setSubjectData(subjectData => ({ ...subjectData, last: null }))
            setLoading(false)
            return
          }

          setSubjectData(subjectData => ({
            ...subjectData,
            last: data.last,
            docs: [...subjectData.docs, ...data.docs],
          }))
          setLoading(false)
        }
      })
      if (node != null) observer.current.observe(node)
    },
    [loading, subjectData.id, subjectData.last]
  )

  return (
    <App>
      <SubjectDiv>
        <TitleDiv>
          <Img
            src={subjectData.university.logoUrl}
            height="max(10vw, 5rem)"
            width="max(10vw, 5rem)"
          />
          <StyledFlex>
            <Title
              fontSize="max(3vw, 1.7rem)"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              {subjectData.name}{' '}
              {subjectData.code != null && `(${subjectData.code})`}
            </Title>
            <Title
              fontSize="max(2vw, 1.2rem)"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              {subjectData.university.name}
            </Title>
          </StyledFlex>
        </TitleDiv>
        {subjectData.docs.length !== 0 ? (
          <CardGrid>
            {subjectData.docs.map((doc, index) => {
              if (subjectData.docs.length === index + 1) {
                return (
                  <DocumentGridCard
                    ref={lastElementRef}
                    key={doc.id}
                    documentData={doc}
                    href={`/subject/${subjectData.id}/${doc.id}`}
                  />
                )
              }

              return (
                <DocumentGridCard
                  key={doc.id}
                  documentData={doc}
                  href={`/subject/${subjectData.id}/${doc.id}`}
                />
              )
            })}
          </CardGrid>
        ) : (
          <Flex justify-content="center">
            <Text textAlign="center" fontSize="1.5rem" margin="2rem 0 1rem 0">
              Todavía no se han subido documentos a esta asignatura.
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
          </Flex>
        )}
        {loading && <Loading />}
      </SubjectDiv>
    </App>
  )
}
