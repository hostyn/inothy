import { css } from '@styled-system/css'
import ProfileDocumentsList from './ProfileDocumentsList'
import { trpc } from '@services/trpc'
import { IoFilterCircleOutline } from 'react-icons/io5'

interface ProfileMainContentProps {
  profileId: string
}

const ProfileMainContent = ({
  profileId,
}: ProfileMainContentProps): JSX.Element => {
  const { data: documentsData } = trpc.document.getDocuments.useQuery({
    id: profileId,
  })
  console.log('documentsData:', documentsData)
  return (
    <article
      className={css({
        width: '4xl',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        gap: 'sm',
      })}
    >
      {/* DOCUMENTOS / VALORACIONES */}
      <section
        className={css({
          display: 'flex',
          gap: 'md',
          alignItems: 'center',
          alignSelf: 'stretch',
          fontWeight: '700',
        })}
      >
        <p>Documentos Subidos</p>
        <p>Valoraciones</p>
      </section>

      {/* FILTROS */}
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
          {documentsData?.length != null &&
            `${documentsData.length} Documentos`}
        </div>
      </section>
      {/* LISTA DOCUMENTOS */}
      <ProfileDocumentsList profileId={profileId} />
    </article>
  )
}
export default ProfileMainContent
