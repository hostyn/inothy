import { useState, useEffect } from 'react'
import Menu from './components/Menu'
import App from '@components/App'
import styled from 'styled-components'
import DocumentCard from '@components/DocumentCard'
import { useAuth } from '@context/authContext'
import { getDocument } from '@util/api'
import Loading from '@components/Loading'
import Link from 'next/link'
import { Button, Text } from '@ui'
import type { FullDocumentInfo } from 'types/api'

const UploadesDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`

const NothingUploaded = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default function UploadsView(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const [uploadsData, setUploadsData] = useState<FullDocumentInfo[] | null>(
    null
  )

  useEffect(() => {
    if (user?.data?.uploaded == null) {
      setLoading(false)
      return
    }
    Promise.all(
      user.data.uploaded.map(async doc => {
        const [subjectId, docId] = doc.split('/')
        return await getDocument(subjectId, docId)
      })
    )
      .then(data => {
        setUploadsData(data)
        setLoading(false)
      })
      .catch(() => {})
  }, [user?.data?.uploaded])

  return (
    <App>
      <Menu selected="uploads">
        <UploadesDiv>
          {loading ? (
            <Loading />
          ) : uploadsData != null && uploadsData.length !== 0 ? (
            uploadsData.map(document => (
              <DocumentCard key={document.id} documentData={document} />
            ))
          ) : (
            <NothingUploaded>
              <Text textAlign="center" fontSize="3rem" color="secondary">
                Aún no has subido nada
              </Text>
              <Text textAlign="center" fontSize="1.5rem">
                ¿Quieres ganar dinero con tus apuntes?
              </Text>
              <Link href="/upload" passHref>
                <Button
                  margin="1rem 0 0 0"
                  width="auto"
                  height="auto"
                  padding="0.5rem 1rem"
                >
                  Subir
                </Button>
              </Link>
            </NothingUploaded>
          )}
        </UploadesDiv>
      </Menu>
    </App>
  )
}
