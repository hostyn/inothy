import DocumentIcon from '@components/DocumentIcons'
import { nunitoSans } from '@config/fonts'
import { css, cx } from '@styled-system/css'
import { currencyFormatter } from '@util/normailize'
import { type RouterOutputs } from 'backend'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'

export default function DocumentCard({
  title,
  contentType,
  previewImageUrl,
  price,
  ratingCount,
  ratingSum,
  subject: {
    name: subjectName,
    university: { name: universityName },
  },
}: RouterOutputs['user']['getDocuments']['documents'][0]): JSX.Element {
  return (
    <div
      className={css({
        borderRadius: 'md',
        padding: 'md',
        bg: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
        gap: 'sm',
      })}
    >
      <div
        className={css({
          width: '100%',
          height: 'lg',
          fontSize: '5xl',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bg: 'white',
          borderRadius: 'md',
        })}
      >
        {previewImageUrl != null ? (
          <Image src={previewImageUrl} alt={title} width={128} height={128} />
        ) : (
          <DocumentIcon mimeType={contentType} />
        )}
      </div>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        })}
      >
        <span
          className={cx(
            nunitoSans.className,
            css({
              fontWeight: 'bolder',
              fontSize: 'lg',
              color: 'primary.500',
            })
          )}
        >
          {currencyFormatter.format(price)}
        </span>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 'xs',
            color: 'rating',
            fontWeight: 'bolder',
            fontSize: 'lg',
          })}
        >
          <span
            className={css({
              lineHeight: '100%',
              paddingTop: '0.15em',
            })}
          >
            {ratingSum != null && ratingCount != null
              ? ratingSum / ratingCount
              : '-'}
          </span>
          <FaStar size={20} />
        </div>
      </div>

      <span
        className={css({
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineClamp: 2,
          fontSize: 'lg',
          fontWeight: '600',
          color: 'primary.500',
        })}
      >
        {title}
      </span>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          color: 'primary.500',
          fontWeight: '400',
        })}
      >
        <span
          className={css({
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
          })}
        >
          {subjectName}
        </span>
        <span
          className={css({
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
          })}
        >
          {universityName}
        </span>
      </div>
    </div>
  )
}
