import { trpc } from '@services/trpc'
import AccountLayout from './layouts/AccountLayout'
import InfiniteScroll from 'react-infinite-scroll-component'
import { css } from '@styled-system/css'
import Spinner from '@components/Spinner'
import DocumentCard from '@components/DocumentCard'
import { MdOutlineSearchOff } from 'react-icons/md'
import { ButtonLink } from '@ui/Button'

export default function Purchased(): JSX.Element {
  const {
    data: documentData,
    fetchNextPage,
    hasNextPage,
    isLoading: isDocumentLoading,
  } = trpc.document.getPurchasedDocuments.useInfiniteQuery(
    {},
    {
      getNextPageParam: lastPage => {
        return lastPage.nextCursor
      },
    }
  )

  return (
    <AccountLayout selected="purchased">
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
                ? 'Aún no has comprado ningún documento.'
                : 'Estos son todos los documentos que has comprado. ¿Necesitas más documentos?'}
            </p>
            <ButtonLink href="/">
              {documentData?.pages[0].documentsCount === 0
                ? 'Comprar documentos'
                : 'Comprar más'}
            </ButtonLink>
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
