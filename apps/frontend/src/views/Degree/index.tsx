import App from '@components/App'
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { PageSpacing } from '@ui/PageSpacing'
import Image from 'next/image'
import SubjectsFilter from './SubjectsFilter'
import FilterSection from './components/FilterSection'
import FilterItem from './components/FilterItem'
import { DOCUMENT_TYPES_WITH_ICON } from '@config/constants'
import { AiOutlineLaptop } from 'react-icons/ai'
import { SlPencil } from 'react-icons/sl'
import { MdOutlineSearchOff } from 'react-icons/md'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ButtonLink } from '@ui/Button'
import Spinner from '@components/Spinner'
import DocumentCard from './components/DocumentCard'
import { useState } from 'react'

interface Props {
  degreeId: string
}

interface Filters {
  subjects: string[]
  documentTypes: string[]
  byHand?: boolean
}

export default function Degree({ degreeId }: Props): JSX.Element {
  const [filters, setFilters] = useState<Filters>({
    subjects: [],
    documentTypes: [],
  })

  const { data: degree } = trpc.degree.getDegree.useQuery({
    degree: degreeId,
  })
  const {
    data: documents,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = trpc.degree.getDocuments.useInfiniteQuery(
    {
      degree: degreeId,
      filters: {
        subjects: filters.subjects.length > 0 ? filters.subjects : undefined,
        documentTypes:
          filters.documentTypes.length > 0 ? filters.documentTypes : undefined,
        byHand: filters.byHand,
      },
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.nextCursor
      },
    }
  )

  const handleDocumentTypeClick = (docType: string): void => {
    setFilters(prevFilters => {
      const documentTypes = prevFilters.documentTypes.includes(docType)
        ? prevFilters.documentTypes.filter(type => type !== docType)
        : [...prevFilters.documentTypes, docType]

      return {
        ...prevFilters,
        documentTypes,
      }
    })
  }

  return (
    <App>
      <PageSpacing
        className={css({
          minH: 'auto',
        })}
      >
        <header
          className={css({
            py: 'md',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'md',
          })}
        >
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              alignItems: 'center',
              gap: 'sm',
            })}
          >
            <Image
              src={degree?.school?.university.logoUrl ?? ''}
              width={40}
              height={40}
              alt={`Logo de ${degree?.school?.university.name ?? ''}`}
              className={css({
                borderRadius: 'md',
              })}
            />
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
              })}
            >
              <h1
                title={`${degree?.name ?? ''} - ${
                  degree?.school?.university.name ?? ''
                }`}
                className={css({
                  fontSize: 'xl',
                  color: 'text',
                  fontWeight: 'bold',
                  lineHeight: '110%',
                  letterSpacing: '-0.02em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineClamp: 2,
                  width: '100%',
                })}
              >
                {degree?.name} - {degree?.school?.university.name}
              </h1>
            </div>
          </div>
        </header>
      </PageSpacing>
      <div
        className={css({
          bg: 'grey.100',
          minH: 'calc(var(--minHeight) - 72px)',
        })}
      >
        <PageSpacing
          className={css({
            py: 'md',
          })}
        >
          <div
            className={css({
              display: 'grid',
              gap: 'md',

              md: {
                gridTemplateColumns: 'token(sizes.xl) 1fr',
              },
            })}
          >
            {/* TODO: Filter section in mobile */}
            <section
              className={css({
                display: 'none',

                md: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'md',
                },
              })}
            >
              <FilterSection title="Asignatura">
                <SubjectsFilter
                  degreeId={degreeId}
                  selected={filters.subjects}
                  onDocumentClick={subjectId => {
                    setFilters(prevFilters => ({
                      ...prevFilters,
                      subjects: prevFilters.subjects.includes(subjectId)
                        ? prevFilters.subjects.filter(id => id !== subjectId)
                        : [...prevFilters.subjects, subjectId],
                    }))
                  }}
                />
              </FilterSection>

              <FilterSection title="Tipo de documento">
                {Object.keys(DOCUMENT_TYPES_WITH_ICON).map(docType => {
                  const documentType = DOCUMENT_TYPES_WITH_ICON[docType]

                  return (
                    <FilterItem
                      key={docType}
                      title={documentType.name}
                      Icon={documentType.icon}
                      selected={filters.documentTypes.includes(docType)}
                      onClick={() => {
                        handleDocumentTypeClick(docType)
                      }}
                    />
                  )
                })}
              </FilterSection>

              <FilterSection title="Elaboración">
                <FilterItem
                  title="Manual"
                  Icon={SlPencil}
                  selected={filters.byHand ?? false}
                  onClick={() => {
                    setFilters(prevFilters => ({
                      ...prevFilters,
                      byHand:
                        prevFilters.byHand == null
                          ? true
                          : prevFilters.byHand
                          ? undefined
                          : true,
                    }))
                  }}
                />
                <FilterItem
                  title="Digital"
                  Icon={AiOutlineLaptop}
                  selected={filters.byHand == null ? false : !filters.byHand}
                  onClick={() => {
                    setFilters(prevFilters => ({
                      ...prevFilters,
                      byHand:
                        prevFilters.byHand == null
                          ? false
                          : !prevFilters.byHand
                          ? undefined
                          : false,
                    }))
                  }}
                />
              </FilterSection>
            </section>
            <section
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: 'md',
                overflow: 'hidden',
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 'sm',
                  textWrap: 'nowrap',
                  width: '100%',
                  overflow: 'hidden',
                })}
              >
                <span
                  className={css({
                    fontWeight: 'bold',
                    color: 'grey.500',
                  })}
                >
                  {isLoading ? '-' : documents?.pages[0].documentsCount}{' '}
                  Documentos
                </span>
                {degree?.subjects
                  ?.filter(subject => filters.subjects.includes(subject.id))
                  .map(subject => (
                    <button
                      key={subject.id}
                      className={css({
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'sm',
                        bg: 'white',
                        borderRadius: 'md',
                        px: 'sm',
                        py: '2xs',

                        fontSize: 'xs',
                        fontWeight: '700',
                        color: 'grey.500',

                        transition: 'all 50ms ease-in-out',

                        _hover: {
                          bg: 'red.100',
                        },

                        '&:hover span': {
                          color: 'red.400',
                        },
                      })}
                      onClick={() => {
                        setFilters(prevFilters => ({
                          ...prevFilters,
                          subjects: prevFilters.subjects.includes(subject.id)
                            ? prevFilters.subjects.filter(
                                id => id !== subject.id
                              )
                            : [...prevFilters.subjects, subject.id],
                        }))
                      }}
                    >
                      <span>{subject.name}</span>
                      <span>X</span>
                    </button>
                  ))}
              </div>
              <InfiniteScroll
                dataLength={
                  documents?.pages.reduce(
                    (acc, page) => acc + page.documents.length,
                    0
                  ) ?? 0
                }
                next={fetchNextPage}
                hasMore={hasNextPage ?? false}
                endMessage={
                  <div
                    className={css({
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'grey.500',
                      paddingY: 'xl',
                      gap: 'sm',
                    })}
                  >
                    <MdOutlineSearchOff size={24} />
                    <p
                      className={css({
                        textAlign: 'center',
                        maxW: '40ch',
                      })}
                    >
                      {documents?.pages[0].documentsCount === 0
                        ? 'Parece que ningún documento cumple con estos filtros. ¡Tu puedes ser el primero en subir uno!'
                        : 'Estos son todos los documentos que tenemos. ¿Quieres subir los tuyos?'}
                    </p>
                    <ButtonLink href="/upload">Subir documento</ButtonLink>
                  </div>
                }
                loader={
                  <div
                    className={css({
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 'sm',
                    })}
                  >
                    <Spinner
                      className={css({
                        fontSize: 'lg',
                        stroke: 'grey.500',
                      })}
                    />
                  </div>
                }
              >
                {isLoading ? (
                  <div
                    className={css({
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 'md',
                    })}
                  >
                    <Spinner
                      className={css({
                        fontSize: 'lg',
                        stroke: 'grey.500',
                      })}
                    />
                  </div>
                ) : (
                  <div
                    className={css({
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: 'sm',
                    })}
                  >
                    {documents?.pages.map(documents =>
                      documents.documents.map(document => (
                        <DocumentCard
                          key={document.id}
                          {...document}
                          bought={true}
                        />
                      ))
                    )}
                  </div>
                )}
              </InfiniteScroll>
            </section>
          </div>
        </PageSpacing>
      </div>
    </App>
  )
}
