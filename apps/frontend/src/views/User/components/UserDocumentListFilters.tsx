import { css } from '@styled-system/css'
import { IoFilterCircleOutline } from 'react-icons/io5'
import { trpc } from '@services/trpc'

interface UserDocumentListFiltersProps {
  userId: string
}

const UserDocumentListFilters = ({
  userId,
}: UserDocumentListFiltersProps): JSX.Element => {
  const { data: documentsData } = trpc.document.getDocuments.useQuery({
    id: userId,
  })
  return (
    <section
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        fontWeight: '500',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 'xs',
          px: 'sm',
          py: 'xs',
          backgroundColor: 'token(colors.grey.100)',
          borderRadius: 'md',
          fontSize: 'sm',
        })}
      >
        <IoFilterCircleOutline />
        <p>Filtros</p>
      </div>
      <div
        className={css({
          color: 'token(colors.grey.500)',
          fontSize: 'md',
        })}
      >
        {documentsData?.length != null && `${documentsData.length} Documentos`}
      </div>
    </section>
  )
}
export default UserDocumentListFilters
