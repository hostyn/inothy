import DocumentIcon from '@components/DocumentIcons'
import { css } from '@styled-system/css'
import { Link } from '@ui/Link'
import { currencyFormatter } from '@util/normailize'
import { type RouterOutputs } from 'backend'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'

export default function DocumentCard(
  document: RouterOutputs['degree']['getDocuments']['documents'][0]
): JSX.Element {
  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: 'sm',
        padding: 'md',
        borderRadius: 'md',
        transition: 'background-color 50ms ease-in-out',

        _hover: {
          bg: 'rgba(0, 0, 0, 0.05)',
        },

        '&:hover i svg': {
          transform: 'scale(1.2)',
        },

        '& i svg': {
          transition: 'transform 150ms ease-in-out',
        },
      })}
    >
      <i
        className={css({
          fontSize: '2xl',
          bg: 'white',
          borderRadius: 'md',
          width: '100%',
          aspectRatio: '4/3',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <DocumentIcon mimeType={document.contentType} />
      </i>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          fontWeight: 'bold',
        })}
      >
        <span
          className={css({
            color: 'text',
          })}
        >
          {currencyFormatter.format(document.price)}
        </span>
        <span
          title={`Valoración media: ${
            document?.ratingSum != null && document?.ratingCount != null
              ? document.ratingSum / document.ratingCount
              : '-'
          }/5`}
          className={css({
            display: 'flex',
            gap: '2xs',
            alignItems: 'center',
            color: 'rating',
          })}
        >
          <FaStar size={12} />
          {document?.ratingSum != null && document?.ratingCount != null
            ? document.ratingSum / document.ratingCount
            : '-'}
        </span>
      </div>
      <Link
        href={`/document/${document.id}`}
        title={document?.title}
        className={css({
          fontWeight: 'bold',
          color: 'text',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineClamp: 2,
          width: '100%',
          lineHeight: '110%',
        })}
      >
        {document?.title}
      </Link>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: 'lg',
        })}
      >
        <Link
          href={`/user/${document?.user.username}`}
          title={document?.user.username}
          className={css({
            display: 'flex',
            gap: 'xs',
            alignItems: 'center',
            fontWeight: '500',
          })}
        >
          <div
            className={css({
              width: '16px',
              height: '16px',
              borderRadius: 'md',
            })}
          >
            <Image
              src={
                document.user?.avatarUrl != null
                  ? document.user?.avatarUrl
                  : '/static/images/default_avatar.png'
              }
              alt={`Foto de perfil de ${document?.user.username}`}
              width={16}
              height={16}
            />
          </div>
          <span
            className={css({
              color: 'grey.500',
            })}
          >
            {document?.user.username}
          </span>
        </Link>
        <span
          title={`${document?.subject.name} ${
            document.subject.code != null ? `(${document.subject.code})` : ''
          }`}
          className={css({
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: 'sm',
            color: 'text',
            textAlign: 'right',
          })}
        >
          {document?.subject.name}{' '}
          {document.subject.code != null && `(${document.subject.code})`}
        </span>
      </div>
    </article>
  )
}
