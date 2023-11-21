import { css } from '@styled-system/css'
import Image from 'next/image'
import { MdOutlineStar } from 'react-icons/md'

interface ProfileDocumentCardProps {
  documentData: {
    previewImageUrl: string | null
    price: number
    title: string
    rating: number | null
    subject: {
      name: string
      university: {
        name: string
      }
    }
  }
}

const ProfileDocumentCard = ({
  documentData,
}: ProfileDocumentCardProps): JSX.Element => {
  const textMaxLength = 25
  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'sm',
        width: 'min-content',
        minWidth: 'lg',
        maxWidth: 'xl',
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
          flexShrink: '0',
          alignSelf: 'stretch',
          border: '2px solid blue',
          position: 'relative',
        })}
      >
        {documentData.previewImageUrl != null && (
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
          {documentData.price.toFixed(2)} €
        </h2>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            color: '#EA8C00',
          })}
        >
          <span className={css({ fontSize: 'sm', fontWeight: '800' })}>
            {documentData.rating != null && documentData.rating}
          </span>
          <MdOutlineStar size={20} />
        </div>
      </section>
      <section
        className={css({
          fontSize: 'md',
          fontWeight: '600',
          lineHeight: '120%',
          height: '5xs',
        })}
      >
        {documentData.title.substring(0, textMaxLength)}
        {documentData.title.length > textMaxLength && <span>...</span>}
      </section>
      <section
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          fontSize: 'xs',
          fontWeight: '400',
          lineHeight: 'normal',
        })}
      >
        <p className={css({})}>
          {documentData.subject.name.substring(0, textMaxLength)}
          {documentData.subject.name.length > textMaxLength && <span>...</span>}
        </p>
        <p>
          {documentData.subject.university.name.substring(0, textMaxLength)}
          {documentData.subject.university.name.length > textMaxLength && (
            <span>...</span>
          )}
        </p>
      </section>
    </article>
  )
}
export default ProfileDocumentCard
