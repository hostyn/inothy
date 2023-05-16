import Pdf from '@components/Pdf'
import { logEvent, storage } from '@config/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import type { FullDocumentInfo } from 'types/api'
import NoPreview from './NoPreview'

const StyledPdf = styled(Pdf)`
  width: 100%;

  @media (max-width: 768px) {
    width: calc(100vw - 4rem);
  }
`

interface PreviewParams {
  documentData: FullDocumentInfo
}

export default function Preview({ documentData }: PreviewParams): JSX.Element {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (documentData.preview) {
      const fileRef = ref(
        storage,
        `previews/${documentData.subject.id}/${documentData.id}.pdf`
      )
      void getDownloadURL(fileRef).then(url => {
        setPreviewUrl(url)
      })
    }
  }, [documentData])

  useEffect(() => {
    try {
      logEvent('view_item', {
        item: documentData.subject.id + '/' + documentData.id,
      })
    } catch {}
  }, [])

  return (
    <>
      {documentData.preview && previewUrl != null ? (
        <StyledPdf
          file={previewUrl}
          loading={<NoPreview mimeType={documentData.contentType} />}
        />
      ) : (
        <NoPreview mimeType={documentData.contentType} />
      )}
    </>
  )
}
