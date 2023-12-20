import DocumentIcon from '@components/DocumentIcons'
import { css } from '@styled-system/css'
import { type RouterOutputs } from 'backend'
import Image from 'next/image'
import Link from 'next/link'
import { IoStar } from 'react-icons/io5'

export default function ReviewCard({
  user,
  comment,
  updatedAt,
  rating,
  document,
}: RouterOutputs['user']['getReviews']['reviews'][0]): JSX.Element {
  return (
    <div
      className={css({
        borderRadius: 'md',
        padding: 'md',
        bg: 'grey.100',
        display: 'grid',
        gridTemplateColumns: 'token(sizes.lg) 1fr',
        gap: 'md',
      })}
    >
      {document.previewImageUrl != null ? (
        <Image
          src={document.previewImageUrl}
          alt={document.title}
          width={192}
          height={192}
        />
      ) : (
        <div
          className={css({
            width: '100%',
            aspectRatio: '1.3',
            fontSize: '5xl',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bg: 'white',
            borderRadius: 'md',
            padding: 'md',
          })}
        >
          <DocumentIcon mimeType={document.contentType} />
        </div>
      )}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 'sm',
          overflow: 'hidden',
        })}
      >
        <Link
          href={`/document/${document.id}`}
          title={document.title}
          className={css({
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'text',

            _hover: {
              textDecoration: 'underline',
            },
          })}
        >
          {document.title}
        </Link>
        <Link
          href={`/user/${user.username}`}
          title={user.username}
          className={css({
            display: 'flex',
            gap: 'sm',
            alignItems: 'center',
            width: 'fit-content',

            _hover: {
              textDecoration: 'underline',
            },
          })}
        >
          <Image
            alt={`Foto de perfil de ${user.username}`}
            width={24}
            height={24}
            src={
              user.avatarUrl != null
                ? user.avatarUrl
                : '/static/images/default_avatar.png'
            }
            className={css({
              borderRadius: 'md',
            })}
          />
          <span
            className={css({
              fontWeight: 'bold',
              color: 'text',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            })}
          >
            @{user.username}
          </span>
        </Link>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 'sm',
          })}
        >
          <span
            className={css({
              color: 'rating',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '2xs',
            })}
          >
            {rating}
            <IoStar
              className={css({
                fill: 'rating',
                marginBottom: '0.1em',
              })}
            />
          </span>
          <span
            className={css({
              color: 'grey.400',
              fontSize: 'sm',
              fontWeight: '600',
            })}
          >
            {updatedAt.toLocaleDateString('es-ES')}
          </span>
        </div>
        <p
          className={css({
            color: 'grey.600',
            whiteSpace: 'pre-wrap',
            lineHeight: '120%',
          })}
        >
          {comment}
        </p>
      </div>
    </div>
  )
}
