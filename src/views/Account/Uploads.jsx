import { useState, useEffect } from 'react'
import Menu from '../../components/Account/Menu'
import App from '../../components/App'
import styled from 'styled-components'
import DocumentCard from '../../components/DocumentCard'
import { useAuth } from '../../context/authContext'
import { getDocument } from '../../util/api'
import Loading from '../../components/Loading'
import Text from '../../components/Text'
import Link from 'next/link'
import Button from '../../components/Button'

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

export default function UploadsView () {
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const [uploadsData, setUploadsData] = useState(null)

  useEffect(() => {
    if (!user?.data?.uploaded) {
      setLoading(false)
      return
    }
    Promise.all(
      user.data.uploaded.map(async (doc) => {
        const [subjectId, docId] = doc.split('/')
        return getDocument(subjectId, docId)
      })
    ).then((data) => {
      setUploadsData(data)
      setLoading(false)
    })
  }, [user?.data?.uploaded])

  return (
    <App>
      <Menu uploads>
        <UploadesDiv>
          {loading
            ? (
            <Loading />
              )
            : uploadsData
              ? (
                  uploadsData.map((data) => (
              <DocumentCard key={data.docId} docuemntData={data}></DocumentCard>
                  ))
                )
              : (
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
