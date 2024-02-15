import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps } from '../types'
import DropZone from '@ui/DropZone'
import { useState } from 'react'
import { trpc } from '@services/trpc'

export default function DocumentUpload({
  next,
  setData,
  data,
  ...props
}: StepProps): JSX.Element {
  const submitKYC = trpc.auth.submitKYC.useMutation()
  const [documents, setDocuments] = useState<[File | null, File | null]>([
    null,
    null,
  ])

  const onSubmit = async (): Promise<void> => {
    if (data?.step !== 'document-type') return

    const { step, email, birthDate, ...kycData } = data

    const birthDateObject = new Date(birthDate)

    const birthDateUTC = new Date(
      Date.UTC(
        birthDateObject.getFullYear(),
        birthDateObject.getMonth(),
        birthDateObject.getDate()
      )
    )

    const files: Array<string | null> = await Promise.all(
      documents.map(
        async file =>
          await new Promise((resolve, reject) => {
            if (file == null) {
              resolve(null)
              return
            }
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
              if (typeof reader.result !== 'string') {
                reject(Error('Error reading file'))
                return
              }
              resolve(reader.result.split(',')[1])
            }
          })
      )
    )

    submitKYC.mutate({
      ...kycData,
      files: files.filter(f => f != null) as string[],
      birthDate: birthDateUTC.getTime(),
    })

    // next()
  }

  return data?.step === 'document-type' ? (
    <TabContent
      onSubmit={e => {
        e.preventDefault()
        void onSubmit()
      }}
      nextText="Finalizar"
      disabled={
        data.step === 'document-type' &&
        ((data.documentType === 'id' && documents.some(d => d == null)) ||
          (data.documentType === 'passport' && documents[0] == null))
      }
      {...props}
    >
      <div
        className={css({
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'xl',
        })}
      >
        <div
          className={css({
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'sm',
          })}
        >
          <h1
            className={css({
              fontSize: '2xl',
              fontWeight: '700',
              lineHeight: '100%',
              textAlign: 'center',
              color: 'text',
              fontFamily: 'nunitoSans',
            })}
          >
            Sube el documento
          </h1>
          <p
            className={css({
              fontSize: 'lg',
              maxWidth: '50ch',
              fontWeight: '400',
              lineHeight: '100%',
              textAlign: 'center',
              color: 'grey.500',
            })}
          >
            {data?.documentType === 'id'
              ? 'Sube una foto de cada cara de tu documento de identidad.'
              : 'Sube una foto de tu pasaporte.'}
          </p>
        </div>
        {data.documentType === 'id' ? (
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              alignItems: 'center',
              justifyItems: 'center',
              rowGap: 'sm',
              columnGap: 'xl',
              width: '100%',
            })}
          >
            <h2
              className={css({
                fontSize: 'lg',
                color: 'grey.500',
                fontWeight: 'bold',
                fontFamily: 'nunitoSans',
              })}
            >
              Cara frontal
            </h2>
            <h2
              className={css({
                fontSize: 'lg',
                color: 'grey.500',
                fontWeight: 'bold',
                fontFamily: 'nunitoSans',
              })}
            >
              Cara trasera
            </h2>
            <DropZone
              onFile={file => {
                setDocuments(documents => [file, documents[1]])
              }}
              minFileSize={32768}
              maxFileSize={7000000}
              accept="application/pdf, image/png, image/jpeg"
            />
            <DropZone
              onFile={file => {
                setDocuments(documents => [documents[0], file])
              }}
              minFileSize={32768}
              maxFileSize={7000000}
              accept="application/pdf, image/png, image/jpeg"
            />
          </div>
        ) : (
          <DropZone
            onFile={file => {
              setDocuments(documents => [file, documents[1]])
            }}
            minFileSize={32768}
            maxFileSize={7000000}
            accept="application/pdf, image/png, image/jpeg"
          />
        )}
      </div>
    </TabContent>
  ) : (
    <></>
  )
}
