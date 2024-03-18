import { trpc } from '@services/trpc'
import AccountLayout from './layouts/AccountLayout'
import useAuth from '@hooks/useAuth'
import { css } from '@styled-system/css'
import DocumentCard from '@components/DocumentCard'
import Spinner from '@components/Spinner'
import { ButtonLink } from '@ui/Button'
import { MdOutlineSearchOff } from 'react-icons/md'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Uploaded(): JSX.Element {
  const { userData } = useAuth()

  const {
    data: documentData,
    fetchNextPage,
    hasNextPage,
    isLoading: isDocumentLoading,
  } = trpc.document.getUploadedDocuments.useInfiniteQuery(
    { username: userData?.username ?? '' },
    {
      getNextPageParam: lastPage => {
        return lastPage.nextCursor
      },
    }
  )

  return (
    <AccountLayout selected="uploaded">
      <InfiniteScroll
        dataLength={
          documentData?.pages.reduce(
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
              {documentData?.pages[0].documentsCount === 0
                ? 'Aún no has subido ningún documento.'
                : 'Estos son todos los documentos que has subido. ¿Tienes más documentos para subir?'}
            </p>
            <ButtonLink href="/upload">Subir documentos</ButtonLink>
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
        {isDocumentLoading ? (
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
              display: 'flex',
              flexDir: 'column',
              gap: 'md',
            })}
          >
            {documentData?.pages.map(documents =>
              documents.documents.map(document => (
                <DocumentCard key={document.id} {...document} bought={true} />
              ))
            )}
          </div>
        )}
      </InfiniteScroll>
    </AccountLayout>
  )
}
