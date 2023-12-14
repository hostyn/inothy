import { trpc } from '@services/trpc'
import { type UserPageProps } from '../layouts/UserLayout'
import DocumentCard from './DocumentCard'
import { css } from '@styled-system/css'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '@components/Spinner'
import { BsFilterCircle } from 'react-icons/bs'
import * as Popover from '@radix-ui/react-popover'

export default function UserDocuments({
  username,
}: UserPageProps): JSX.Element {
  const { data: userData } = trpc.user.getUser.useQuery({ username })

  const {
    data: documentData,
    fetchNextPage,
    hasNextPage,
  } = trpc.user.getDocuments.useInfiniteQuery(
    {
      username,
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.nextCursor
      },
    }
  )

  return (
    <>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 'md',
        })}
      >
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              className={css({
                color: 'grey.500',
                bg: 'grey.100',
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
                    {university.name}
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
                        title={subject.name}
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

                          _hover: {
                            bg: 'grey.200',
                          },
                        })}
                      >
                        {subject.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
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
      </InfiniteScroll>
    </>
  )
}
