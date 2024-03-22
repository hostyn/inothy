import { trpc } from '@services/trpc'
import { type UserPageProps } from '../layouts/UserLayout'
import DocumentCard from './DocumentCard'
import { css } from '@styled-system/css'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '@components/Spinner'
import { BsFilterCircle } from 'react-icons/bs'
import * as Popover from '@radix-ui/react-popover'
import { useState } from 'react'
import { type RouterOutputs } from 'backend'
import { CiFaceMeh } from 'react-icons/ci'

export default function UserDocuments({
  username,
}: UserPageProps): JSX.Element {
  const { data: userData } = trpc.user.getUser.useQuery({ username })

  const [filters, setFilters] = useState<
    Record<
      string,
      RouterOutputs['user']['getUser']['universitiesUploaded'][0]['subjects'][0]
    >
  >({})

  const {
    data: documentData,
    fetchNextPage,
    hasNextPage,
    isLoading: isDocumentLoading,
  } = trpc.user.getDocuments.useInfiniteQuery(
    {
      username,
      subjects:
        Object.keys(filters).length > 0 ? Object.keys(filters) : undefined,
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.nextCursor
      },
    }
  )

  return documentData?.pages.reduce(
    (acc, page) => acc + page.documents.length,
    0
  ) === 0 ? (
    <div
      className={css({
        color: 'grey.500',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingY: 'xl',
      })}
    >
      <CiFaceMeh size={64} />
      <span
        className={css({
          fontWeight: 'bold',
          fontSize: 'lg',
        })}
      >
        No hay documentos
      </span>
      <p>Este usuario no ha subido ningún documento todavía.</p>
    </div>
  ) : (
    <>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'md',
        })}
      >
        {/* TODO: Add animations */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              className={css({
                color: 'grey.500',
                bg:
                  Object.keys(filters).length > 0 ? 'primary.200' : 'grey.100',
                paddingX: 'sm',
                paddingY: 'xs',
                borderRadius: 'md',
                display: 'flex',
                gap: 'sm',
                alignItems: 'center',
              })}
            >
              <BsFilterCircle />
              Filters
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              align="start"
              className={css({
                width: '2xl',
                bg: 'grey.100',
                borderRadius: 'md',
                padding: 'md',
                display: 'flex',
                flexDirection: 'column',
                gap: 'md',
                boxShadow: 'regular',
                marginTop: 'sm',
              })}
            >
              {userData?.universitiesUploaded.map(university => (
                <div
                  key={university.id}
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'sm',
                    lineHeight: '100%',
                  })}
                >
                  <span
                    className={css({
                      color: 'grey.300',
                      fontWeight: 'bold',
                      letterSpacing: '-0.02em',
                      fontSize: 'sm',
                    })}
                  >
                    {university.name} ({university.symbol})
                  </span>
                  <div
                    className={css({
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'xs',
                    })}
                  >
                    {university.subjects.map(subject => (
                      <button
                        key={subject.id}
                        title={`${subject.name} (${subject.code})`}
                        className={css({
                          textAlign: 'left',
                          paddingX: 'sm',
                          paddingY: 'xs',
                          color: 'grey.500',
                          borderRadius: 'md',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          transition: 'background 0.1s ease-in-out',
                          bg: subject.id in filters ? 'primary.200' : 'none',

                          _hover: {
                            bg:
                              subject.id in filters
                                ? 'primary.300'
                                : 'grey.200',
                          },
                        })}
                        onClick={() => {
                          if (subject.id in filters)
                            setFilters(({ [subject.id]: _, ...rest }) => rest)
                          else
                            setFilters({
                              ...filters,
                              [subject.id]: subject,
                            })
                        }}
                      >
                        {subject.name} ({subject.code})
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        <span
          className={css({
            color: 'grey.500',
            fontWeight: 'bold',
            letterSpacing: '-0.02em',
          })}
        >
          {isDocumentLoading ? '-' : documentData?.pages[0].documentsCount}{' '}
          documentos
        </span>
      </div>
      <InfiniteScroll
        dataLength={
          documentData?.pages.reduce(
            (acc, page) => acc + page.documents.length,
            0
          ) ?? 0
        }
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader={
          <div
            className={css({
              gridColumn: '1 / -1',
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
        }
        hasChildren
      >
        {isDocumentLoading ? (
          <div
            className={css({
              gridColumn: '1 / -1',
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
              // TODO: Adjust grid minmax size
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 'md',
            })}
          >
            {documentData?.pages.map(page =>
              page.documents.map(document => (
                <DocumentCard key={document.id} {...document} />
              ))
            )}
          </div>
        )}
      </InfiniteScroll>
    </>
  )
}
