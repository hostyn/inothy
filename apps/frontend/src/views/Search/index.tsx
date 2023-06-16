import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import App from '@components/App'
import { logEvent } from '@config/firebase'
import { colors, sizes } from '@config/theme'
import { Button, Flex, Img, SearchBox, Text } from '@ui'
import type {
  DegreeRecord,
  SchoolRecord,
  SearchResults,
  SubjectRecord,
  UniversityRecord,
} from 'types/algolia'

const EmptySearch = styled.div`
  height: calc(100vh - ${sizes.navbar});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SearchDiv = styled.div`
  margin: 2rem calc(${sizes.inlineMargin} * 2);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    margin: 2rem;
  }
`

const HorizontalCard = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;
  padding: 10px;
  border-radius: 10px;
  transition: 0.2s;
  cursor: pointer;
  user-select: none;

  :hover {
    background-color: ${colors.hover};
  }
`

const PagesDiv = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.emphasis};
  border-radius: 10000px;
`

const PageDiv = styled.div<{ selected: boolean }>`
  background-color: ${props =>
    props.selected ? colors.primary : 'transparent'};
  border-radius: 1000000px;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;

  ${props =>
    !props.selected &&
    `
    :hover { 
      background-color: ${colors.hover}
    }
  `};
`

const StyledButton = styled(Button)`
  padding: 0;
  margin: 0;
  font-weight: bold;
  background-color: transparent;

  :disabled {
    background-color: transparent;
  }
`

const getPages = (page: number, total: number): Array<false | number> => {
  return [...Array(total)]
    .map(
      (_, item) =>
        item === 0 ||
        item === total - 1 ||
        item === page - 1 ||
        item === page ||
        item === page + 1
    )
    .reduce<Array<false | number>>((current, actual, index) => {
      if (actual) {
        return [...current, index]
      }

      if (current[current.length - 1] !== false) {
        return [...current, false]
      }

      return current
    }, [])
}

const reduceQ = (
  q: SearchResults
): {
  university: UniversityRecord[]
  school: SchoolRecord[]
  degree: DegreeRecord[]
  subject: SubjectRecord[]
} =>
  q?.hits.reduce(
    (group, product) => {
      group[product.type].push(product as any)
      return group
    },
    {
      university: [] as UniversityRecord[],
      school: [] as SchoolRecord[],
      degree: [] as DegreeRecord[],
      subject: [] as SubjectRecord[],
    }
  )

interface SearchProps {
  q: SearchResults
}

export default function SearchView({ q }: SearchProps): JSX.Element {
  const [results, setResults] = useState(reduceQ(q))
  const { push } = useRouter()

  useEffect(() => {
    setResults(reduceQ(q))
  }, [q])

  useEffect(() => {
    if (q != null) {
      try {
        logEvent('search', { query: q.query })
      } catch {}
    }
  }, [q])

  return (
    <App>
      {q == null ? (
        <EmptySearch>
          <Img src="/logo.svg" height="6rem" />
          <Text fontSize="2rem" fontFamily="HelveticaRounded" margin="1rem 0">
            Buscar en Inothy
          </Text>
          <SearchBox height="3rem" width="min(80%, 50rem)" noHide />
        </EmptySearch>
      ) : q.hits.length === 0 ? (
        <EmptySearch>
          <Img src="/logo.svg" height="6rem" />
          <Text
            fontSize="1.4rem"
            fontFamily="HelveticaRounded"
            margin="1rem 0"
            maxWidth="min(80%, 50rem)"
            textAlign="center"
          >
            No hemos encontrado nada que coincida con &quot;{q.query}&quot;
          </Text>
          <SearchBox height="3rem" width="min(80%, 50rem)" noHide />
        </EmptySearch>
      ) : (
        <SearchDiv>
          <Text>
            Mostrando {q.hits.length} de {q.nbHits} resultados para{' '}
            {'"' + q.query + '"'}
          </Text>

          {/* UNIVERSITIES */}

          {results.university.length !== 0 && (
            <Flex>
              <Text fontSize="2rem" fontFamily="HelveticaRounded">
                Universidades
              </Text>
              {results.university.map(item => (
                <Link
                  key={item.objectID}
                  href={'/universities/' + item.objectID}
                >
                  <HorizontalCard>
                    <Img src={item.logoUrl} height="3rem" width="3rem" />
                    <Flex justifyContent="center">
                      <Text fontSize="1.5rem" fontFamily="HelveticaRounded">
                        {item.name} {item.symbol != null && `(${item.symbol})`}
                      </Text>
                    </Flex>
                  </HorizontalCard>
                </Link>
              ))}
            </Flex>
          )}

          {/* SCHOOLS */}
          {results.school.length !== 0 && (
            <Flex>
              <Text fontSize="2rem" fontFamily="HelveticaRounded">
                Facultades
              </Text>
              {results.school.map(item => (
                <Link
                  key={item.objectID}
                  href={'/universities/' + item.objectID}
                >
                  <HorizontalCard>
                    <Img src={item.logoUrl} height="3rem" width="3rem" />
                    <Flex justifyContent="center">
                      <Text fontSize="1.5rem" fontFamily="HelveticaRounded">
                        {item.name}
                      </Text>
                      <Text>{item.universityName}</Text>
                    </Flex>
                  </HorizontalCard>
                </Link>
              ))}
            </Flex>
          )}

          {/* DEGREES */}
          {results.degree.length !== 0 && (
            <Flex>
              <Text fontSize="2rem" fontFamily="HelveticaRounded">
                Grados
              </Text>
              {results.degree.map(item => (
                <Link
                  key={item.objectID}
                  href={`/universities/${item.objectID}`}
                >
                  <HorizontalCard>
                    <Img src={item.logoUrl} height="3rem" width="3rem" />
                    <Flex justifyContent="center">
                      <Text fontSize="1.5rem" fontFamily="HelveticaRounded">
                        {item.name}
                      </Text>
                      <Text>
                        {item.universityName} - {item.schoolName}
                      </Text>
                    </Flex>
                  </HorizontalCard>
                </Link>
              ))}
            </Flex>
          )}

          {/* SUBJECTS */}
          {results.subject.length !== 0 && (
            <Flex>
              <Text fontSize="2rem" fontFamily="HelveticaRounded">
                Asignaturas
              </Text>
              {results.subject.map(item => (
                <Link key={item.objectID} href={'/subject/' + item.objectID}>
                  <HorizontalCard>
                    <Img src={item.logoUrl} height="3rem" width="3rem" />
                    <Flex justifyContent="center">
                      <Text fontSize="1.2rem" fontFamily="HelveticaRounded">
                        {item.name} {item.code != null && `(${item.code})`}
                      </Text>
                      <Text>{item.universityName}</Text>
                    </Flex>
                  </HorizontalCard>
                </Link>
              ))}
            </Flex>
          )}

          <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap="1rem"
          >
            <StyledButton
              onClick={async () =>
                await push('/search?q=' + q.query, undefined, {
                  shallow: false,
                })
              }
              fontSize="1.5rem"
              disabled={q.page === 0}
              color={q.page === 0 ? 'hover' : 'primary'}
            >
              {'<'}
            </StyledButton>
            <PagesDiv>
              {getPages(q.page, q.nbPages).map((item, index) =>
                item !== false ? (
                  <PageDiv
                    key={item}
                    selected={q.page === item}
                    onClick={async () =>
                      await push(
                        `/search?q=${q.query}&page=${item}`,
                        undefined,
                        {
                          shallow: false,
                        }
                      )
                    }
                  >
                    <Text
                      fontSize="1rem"
                      color={q.page === item ? 'white' : 'primary'}
                      fontWeight="bold"
                      userSelect="none"
                    >
                      {item + 1}
                    </Text>
                  </PageDiv>
                ) : (
                  <Text key={index} userSelect="none">
                    ...
                  </Text>
                )
              )}
            </PagesDiv>

            <StyledButton
              onClick={async () =>
                await push(
                  `/search?q=${q.query}&page=${q.page + 1}`,
                  undefined,
                  {
                    shallow: false,
                  }
                )
              }
              fontSize="1.5rem"
              disabled={q.page === q.nbPages - 1}
              color={q.page === q.nbPages - 1 ? 'hover' : 'primary'}
            >
              {'>'}
            </StyledButton>
          </Flex>
        </SearchDiv>
      )}
    </App>
  )
}
