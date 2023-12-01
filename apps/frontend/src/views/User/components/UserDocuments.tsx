import { trpc } from '@services/trpc'
import { type UserPageProps } from '../layouts/UserLayout'

export default function UserDocuments({
  username,
}: UserPageProps): JSX.Element {
  const { data: documentData, fetchNextPage } =
    trpc.user.getDocuments.useInfiniteQuery(
      {
        username,
      },
      {
        getNextPageParam: lastPage => {
          return lastPage.nextCursor
        },
      }
    )

  console.log(documentData)

  return (
    <div>
      {documentData?.pages[0].documents.map(document => (
        <h1 key={document.id}>{document.title}</h1>
      ))}

      <button onClick={fetchNextPage}>buton</button>
    </div>
  )
}
