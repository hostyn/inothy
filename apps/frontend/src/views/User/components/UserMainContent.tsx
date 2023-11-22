import { css } from '@styled-system/css'
import UserDocumentsList from './UserDocumentsList'

import { useState } from 'react'
import UserRatings from './UserRatings'

interface UserMainContentProps {
  userId: string
}

const UserMainContent = ({ userId }: UserMainContentProps): JSX.Element => {
  const [showDocs, setShowDocs] = useState(true)

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
      <section
        className={css({
          display: 'flex',
          gap: 'md',
          alignItems: 'center',
          alignSelf: 'stretch',
          fontWeight: '700',
        })}
      >
        <p
          className={
            showDocs
              ? css({
                  color: 'token(colors.text)',
                  backgroundColor: 'token(colors.grey.100)',
                  padding: 'sm',
                  borderRadius: 'md',
                  cursor: 'pointer',
                })
              : css({
                  color: 'token(colors.grey.400)',
                  padding: 'sm',
                  borderRadius: 'md',
                  cursor: 'pointer',
                })
          }
          onClick={() => {
            setShowDocs(true)
          }}
        >
          Documentos Subidos
        </p>
        <p
          className={
            !showDocs
              ? css({
                  color: 'token(colors.text)',
                  backgroundColor: 'token(colors.grey.100)',
                  padding: 'sm',
                  borderRadius: 'md',
                  cursor: 'pointer',
                })
              : css({
                  color: 'token(colors.grey.400)',
                  padding: 'sm',
                  borderRadius: 'md',
                  cursor: 'pointer',
                })
          }
          onClick={() => {
            setShowDocs(false)
          }}
        >
          Valoraciones
        </p>
      </section>

      {showDocs ? (
        <UserDocumentsList userId={userId} />
      ) : (
        <UserRatings userId={userId} />
      )}
    </article>
  )
}
export default UserMainContent
