import { useState, useEffect } from 'react'
import Menu from './components/Menu'
import App from '@components/App'
import DocumentCard from '@components/DocumentCard'
import { useAuth } from '@context/authContext'
import { getDocument } from '@util/api'
import Loading from '@components/Loading'
import Link from 'next/link'
import { Button, Flex, Text } from '@ui'
import type { FullDocumentInfo } from 'types/api'

export default function DownloadsView(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const [downloadsData, setDownloadsData] = useState<FullDocumentInfo[] | null>(
    null
  )

  useEffect(() => {
    if (user?.data?.bought == null) {
      setLoading(false)
      return
    }
    Promise.all(
      user.data.bought.map(async doc => {
        const [subjectId, docId] = doc.split('/')
        return await getDocument(subjectId, docId)
      })
    )
      .then(data => {
        setDownloadsData(data)
        setLoading(false)
      })
      .catch(() => {})
  }, [user?.data?.bought])

  return (
    <App>
      <Menu selected="downloads">
        <Flex gap="1rem" height="inherit">
          {loading ? (
            <Loading />
          ) : downloadsData != null && downloadsData.length > 0 ? (
            downloadsData.map(document => (
              <DocumentCard
                key={document.id}
                documentData={document}
              ></DocumentCard>
            ))
          ) : (
            <Flex
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
            >
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
            </Flex>
          )}
        </Flex>
      </Menu>
    </App>
  )
}
