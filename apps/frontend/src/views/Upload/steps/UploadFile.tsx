import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps } from '../types'
import { useState } from 'react'
import DropZone from '../components/DropZone'

export default function UploadFile({
  prev,
  next,
  value,
  title,
  setData,
  ...props
}: StepProps): JSX.Element {
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if (file == null) return

    setData({
      step: 'upload-document',
      file,
    })
    next()
  }

  return (
    <TabContent
      value={value}
      title={title}
      disabled={file == null}
      onSubmit={handleSubmit}
      {...props}
    >
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
          gap: '5xl',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 'md',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <h1
            className={css({
              fontSize: '2xl',
              color: 'text',
              fontWeight: '700',
            })}
          >
            Sube el documento
          </h1>
          <p
            className={css({
              maxWidth: '70ch',
              textAlign: 'center',
            })}
          >
            Te recomendamos que subas un PDF, así podremos verificar tu
            documento con IA y los uauarios podrán ver una pequeña
            previsualización.
          </p>
        </div>

        <DropZone onFile={setFile} />
      </div>
    </TabContent>
  )
}
