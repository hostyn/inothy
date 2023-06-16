import Link from 'next/link'
import styled from 'styled-components'
import { colors } from '@config/theme'
import { getDownloadUrl } from '@util/api'
import mimeTypes from '@util/mimeTypes'
import { A, Button, Img } from '@ui'
import { type FullDocumentInfo } from 'types/api'

const Card = styled.div`
  display: grid;
  grid-template-columns: 3rem auto min-content;
  gap: 1rem;
  border-radius: 10px;
  border: 3px solid ${colors.primary};
  align-items: center;

  width: 100%;
  padding: 1rem;

  margin: 0 0 1rem 0;
`

const StyledA = styled(A)`
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`

interface DocumentCardProps {
  documentData: FullDocumentInfo
}

export default function DocumentCard({
  documentData,
}: DocumentCardProps): JSX.Element {
  const handleDownload = async (): Promise<void> => {
    const url = await getDownloadUrl(documentData.subject.id, documentData.id)

    const response = await fetch(url)
    const blob = await response.blob()
    const href = URL.createObjectURL(blob)
    const element = document.createElement('a')
    element.href = href
    element.download = documentData.fileName
    element.click()
    element.remove()
    URL.revokeObjectURL(href)
  }

  return (
    <Card>
      <Img
        src={`/icons/files/${
          mimeTypes[documentData.contentType as keyof typeof mimeTypes] ??
          'file.svg'
        }`}
        aspectRatio="61/75"
        height="3rem"
        width="auto"
      />
      <Link
        href={`/subject/${documentData.subject.id}/${documentData.id}`}
        passHref
      >
        <StyledA color="primary" fontSize="1.5rem">
          {documentData.name}
        </StyledA>
      </Link>
      <Button padding="1rem" height="auto" margin="0" onClick={handleDownload}>
        <Img src="/icons/download.svg" height="1.5rem" width="1.5rem" />
      </Button>
    </Card>
  )
}
