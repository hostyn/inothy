import { useState, useEffect } from 'react'
import Menu from '../../components/Account/Menu'
import App from '../../components/App'
import styled from 'styled-components'
import DocumentCard from '../../components/DocumentCard'
import { useAuth } from '../../context/authContext'
import { getDocument } from '../../util/api'
import Loading from '../../components/Loading'
import Text from '@ui/Text'
import Link from 'next/link'
import Button from '@ui/Button'

const DownloadsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: inherit;
`

const NothingBought = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default function DownloadsView () {
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const [downloadsData, setDownloadsData] = useState(null)

  useEffect(() => {
    if (!user?.data?.bought) {
      setLoading(false)
      return
    }
    Promise.all(
      user.data.bought.map(async (doc) => {
        const [subjectId, docId] = doc.split('/')
        return getDocument(subjectId, docId)
      })
    ).then((data) => {
      setDownloadsData(data)
      setLoading(false)
    })
  }, [user?.data?.bought])

  return (
    <App>
      <Menu downloads>
        <DownloadsDiv>
          {loading
            ? (
            <Loading />
              )
            : downloadsData?.length
              ? (
                  downloadsData.map((data) => (
              <DocumentCard key={data.docId} docuemntData={data}></DocumentCard>
                  ))
                )
              : (
            <NothingBought>
              <Text textAlign="center" fontSize="3rem" color="secondary">
                Aún no has comprado nada
              </Text>
              <Text textAlign="center" fontSize="1.5rem">
                ¿Estas listo para aprobar?
              </Text>
              <Link href="/" passHref>
                <Button
                  margin="1rem 0 0 0"
                  width="auto"
                  height="auto"
                  padding="0.5rem 1rem"
                >
                  Comprar apuntes
                </Button>
              </Link>
            </NothingBought>
                )}
        </DownloadsDiv>
      </Menu>
    </App>
  )
}
