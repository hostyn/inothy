import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import Image from 'next/image'
import { MdOutlineStar } from 'react-icons/md'

interface UserDocumentCardProps {
  documentId: string
}

const UserDocumentCard = ({
  documentId,
}: UserDocumentCardProps): JSX.Element => {
  const { data: documentData } = trpc.document.getDocument.useQuery({
    id: documentId,
  })

  const textMaxLength = 25 // TODO: Ver si se quiere capar la longitud de ciertos campos

  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'sm',
        minW: 'fit-content',
        height: 'xl',
        padding: 'md',
        borderRadius: 'md',
        color: 'token(colors.text)',
        backgroundColor: 'white',
      })}
    >
      <section
        className={css({
          height: 'sm',
          border: '2px solid blue',
          position: 'relative',
        })}
      >
        {documentData?.previewImageUrl != null && (
          <Image
            fill
            alt={documentData.title}
            src={documentData.previewImageUrl}
          />
        )}
      </section>
      <section
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        })}
      >
        <h2
          className={css({
            color: 'token(colors.text)',
            fontSize: 'lg',
            fontWeight: '800',
          })}
        >
          {documentData?.price.toFixed(2) ?? ''} €
        </h2>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            color: '#EA8C00',
          })}
        >
          <span className={css({ fontSize: 'sm', fontWeight: '800' })}>
            {documentData?.rating ?? ''}
          </span>
          <MdOutlineStar size={20} />
        </div>
      </section>
      <section
        className={css({
          fontSize: 'lg',
          fontWeight: '600',
          lineHeight: '120%',
          height: '5xs',
        })}
      >
        {/* TODO: Esto con css  */}
        {documentData?.title.substring(0, textMaxLength) ?? ''}
        {documentData?.title.length != null &&
          documentData?.title.length > textMaxLength && <span>...</span>}
      </section>
      <section
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          fontSize: 'md',
          fontWeight: '400',
        })}
      >
        <p className={css({})}>
          {documentData?.subject.name.substring(0, textMaxLength) ?? ''}
          {documentData?.subject.name.length != null &&
            documentData?.subject.name.length > textMaxLength && (
              <span>...</span>
            )}
        </p>
        <p>
          {documentData?.subject.university.name.substring(0, textMaxLength) ??
            ''}
          {documentData?.subject.university.name.length != null &&
            documentData?.subject.university.name.length > textMaxLength && (
              <span>...</span>
            )}
        </p>
      </section>
    </article>
  )
}
export default UserDocumentCard
