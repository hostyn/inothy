import DocumentIcon from '@components/DocumentIcons'
import DownloadDocumentButton from '@components/DownloadDocumentButton'
import { DOCUMENT_TYPES } from '@config/constants'
import { css } from '@styled-system/css'
import { Link } from '@ui/Link'
import { currencyFormatter } from '@util/normailize'
import { type RouterOutputs } from 'backend'
import { FaStar } from 'react-icons/fa'

export default function DocumentCard(
  document: RouterOutputs['document']['getDocument']
): JSX.Element {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 'md',
        width: '100%',
        maxW: '4xl',
      })}
    >
      <i
        className={css({
          fontSize: '2xl',
          bg: 'grey.100',
          borderRadius: 'md',
          padding: 'xl',
        })}
      >
        <DocumentIcon mimeType={document.contentType} />
      </i>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          gap: 'xs',
          lineHeight: '1',
          color: 'grey.500',
          width: '100%',
        })}
      >
        <Link
          href={`/document/${document.id}`}
          target="_blank"
          title={document?.title}
          className={css({
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineClamp: 2,
            width: '100%',
            lineHeight: '100%',
          })}
        >
          {document?.title}
        </Link>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 'xs',
            color: 'grey.500',
            lineHeight: '100%',
          })}
        >
          <Link
            weight="normal"
            href={`/user/${document.user.username}`}
            target="_blank"
            title={document?.user.username}
            className={css({
              width: 'fit-content',
              lineHeight: 'inherit',
              fontSize: 'inherit',
              color: 'inherit',
            })}
          >
            {document?.user.username}
          </Link>
          <span>∙</span>
          <span title={DOCUMENT_TYPES[document?.documentType.name ?? '']}>
            {DOCUMENT_TYPES[document?.documentType.name ?? '']}
          </span>
          <span>∙</span>
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
        <span
          className={css({
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          })}
          title={`${document?.subject.name ?? ''}${
            document?.subject.code != null ? ` (${document?.subject.code})` : ''
          }`}
        >
          {document?.subject.name}{' '}
          {document?.subject.code != null && `(${document?.subject.code})`}
        </span>
        <span
          className={css({
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          })}
          title={document?.subject.university.name}
        >
          {document?.subject.university.name}
        </span>
      </div>
      {document.bought ? (
        <DownloadDocumentButton documentId={document.id} />
      ) : (
        <span
          className={css({
            color: 'primary.500',
            fontSize: 'lg',
            fontWeight: '700',
            fontFamily: 'nunitoSans',
          })}
        >
          {currencyFormatter.format(document?.price ?? 0)}
        </span>
      )}
    </div>
  )
}
