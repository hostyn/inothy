import { trpc } from '@services/trpc'
import ProfileDocumentCard from './ProfileDocumentCard'
import { css } from '@styled-system/css'

interface DocumentsListProps {
  profileId: string
}

const DocumentsGrid = ({ profileId }: DocumentsListProps): JSX.Element => {
  const { data: documentsData } = trpc.document.getDocuments.useQuery({
    id: profileId,
  })
  console.log(documentsData)
  return (
    <section
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: 'auto',
        rowGap: 'md',
        alignSelf: 'stretch',
        flexWrap: 'wrap',
        padding: 'md',
        backgroundColor: 'token(colors.grey.100)',
        borderRadius: 'lg',
      })}
    >
      {documentsData?.map(documentData => (
        <ProfileDocumentCard
          key={documentData.id}
          documentData={documentData}
        />
      ))}
    </section>
  )
}
export default DocumentsGrid
