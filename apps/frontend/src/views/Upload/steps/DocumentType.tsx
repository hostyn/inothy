import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps, UploadData } from '../types'
import { trpc } from '@services/trpc'
import { useState } from 'react'
import { DOCUMENT_TYPES_WITH_ICON } from '@config/constants'

export default function DocumentType({
  next,
  setData,
  ...props
}: StepProps): JSX.Element {
  const { data: documentTypes } = trpc.document.getDocumentTypes.useQuery()
  const [documentType, setDocumentType] = useState<null | string>(null)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    setData((data: UploadData) => ({
      ...data,
      documentType,
    }))

    next()
  }

  return (
    <TabContent
      onSubmit={handleSubmit}
      disabled={documentType == null}
      {...props}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'md',
          width: '100%',
          maxHeight: 'inherit',

          md: {
            gap: 'xl',
          },
        })}
      >
        <h1
          className={css({
            fontFamily: 'nunitoSans',
            fontSize: '2xl',
            color: 'text',
            fontWeight: '700',
            lineHeight: '1.2',
          })}
        >
          ¿Qué tipo de documento es?
        </h1>

        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'md',
            height: '100%',
            width: '100%',
            overflowY: 'scroll',
            padding: '3px',
            mb: 'sm',

            lg: {
              height: '3xl',
              mb: 0,
            },
          })}
        >
          {documentTypes?.map(docType => {
            const Icon = DOCUMENT_TYPES_WITH_ICON[docType.name].icon
            return (
              <button
                key={docType.id}
                type="button"
                className={`${documentTypeCardStyles} ${
                  docType.id === documentType
                    ? documentTypeCardSelectedStyles
                    : ''
                }`}
                onClick={() => {
                  setDocumentType(docType.id)
                }}
              >
                <span
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'grey.500',
                    textAlign: 'left',
                    gap: 'sm',
                  })}
                >
                  <span
                    className={css({
                      lineHeight: '100%',
                      fontWeight: '700',
                      color: 'text',
                    })}
                  >
                    {DOCUMENT_TYPES_WITH_ICON[docType.name].name}
                  </span>
                  <span
                    className={css({
                      lineHeight: '100%',
                      fontSize: 'sm',
                    })}
                  >
                    {DOCUMENT_TYPES_WITH_ICON[docType.name].description}
                  </span>
                </span>
                <Icon />
              </button>
            )
          })}
        </div>
      </div>
    </TabContent>
  )
}

const documentTypeCardSelectedStyles = css({
  outline: '2px solid token(colors.primary.300)',
  outlineOffset: '-1px',
})

const documentTypeCardStyles = css({
  display: 'grid',
  gridTemplateColumns: '1fr 32px',
  alignItems: 'center',
  border: '1px solid token(colors.grey.100)',
  width: '3xl',
  maxW: '100%',
  py: 'md',
  px: 'lg',
  borderRadius: 'md',
  transition: 'outline-width 50ms ease-in-out, outline-offset 50ms ease-in-out',

  _focus: {
    outline: '3px solid token(colors.primary.300)',
    outlineOffset: '0',
  },
})
