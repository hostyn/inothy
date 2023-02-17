import Link from 'next/link'
import styled from 'styled-components'
import { colors } from '../config/theme'
import { useAuth } from '../context/authContext'
import { getDownloadUrl } from '../util/api'
import mimeTypes from '../util/mimeTypes'
import A from './A'
import Button from './Button'
import Img from './Img'

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

export default function DocumentCard ({ docuemntData }) {
  const { user } = useAuth()

  const handleDownload = async () => {
    const { url } = await getDownloadUrl(
      user,
      docuemntData.subjectId,
      docuemntData.docId
    )

    const response = await fetch(url)
    const blob = await response.blob()
    const href = URL.createObjectURL(blob)
    const element = document.createElement('a')
    element.href = href
    element.download = docuemntData.fileName
    element.click()
    element.remove()
    URL.revokeObjectURL(href)
  }

  return (
    <Card>
      <Img
        src={`/icons/files/${
          mimeTypes[docuemntData.contentType] || 'file.svg'
        }`}
        aspectRatio="61/75"
        height="3rem"
        width="auto"
      />
      <Link
        href={`/subject/${docuemntData.subjectId}/${docuemntData.docId}`}
        passHref
      >
        <StyledA color="primary" fontSize="1.5rem">
          {docuemntData.name}
        </StyledA>
      </Link>
      <Button padding="1rem" height="auto" margin="0" onClick={handleDownload}>
        <Img src="/icons/download.svg" height="1.5rem" width="1.5rem" />
      </Button>
    </Card>
  )
}
