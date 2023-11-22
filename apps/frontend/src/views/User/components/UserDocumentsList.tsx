import { trpc } from '@services/trpc'
import UserDocumentCard from './UserDocumentCard'
import { css } from '@styled-system/css'
import UserDocumentListFilters from './UserDocumentListFilters'

interface UserDocumentsListProps {
  userId: string
}

const UserDocumentsList = ({ userId }: UserDocumentsListProps): JSX.Element => {
  const { data: documentsData } = trpc.document.getDocuments.useQuery({
    id: userId,
  })

  return (
    <>
      <UserDocumentListFilters userId={userId} />
      <section
        className={css({
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'center',
          gap: 'lg',
          padding: 'md',
          flexWrap: 'wrap',
          backgroundColor: 'token(colors.grey.100)',
          borderRadius: 'md',
        })}
      >
        {documentsData?.map(documentData => (
          <UserDocumentCard
            key={documentData.id}
            documentId={documentData.id}
          />
        ))}
      </section>
    </>
  )
}
export default UserDocumentsList
