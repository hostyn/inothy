import { useEffect, useState } from 'react'
import styled from 'styled-components'
import App from '@components/App'
import DocumentCard from '@components/DocumentCard'
import Loading from '@components/Loading'
import { sizes } from '@config/theme'
import { useAuth } from '@context/authContext'
import { getDocument, getTransaction } from '@util/api'
import { Img, Text } from '@ui'
import type { FullDocumentInfo } from 'types/api'
import type { FirestoreTransaction } from 'types/firestore'

const CompletePayDiv = styled.div`
  min-height: calc(100vh - ${sizes.navbar});
  margin: 0 ${sizes.inlineMargin};
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

// TODO: Transaction not found

export default function CompletePayPage({
  transactionId,
}: {
  transactionId: string
}): JSX.Element {
  const { user, isUser, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [transactionData, setTransactionData] =
    useState<FirestoreTransaction | null>(null)
  const [bought, setBought] = useState<FullDocumentInfo[] | null>(null)

  useEffect(() => {
    if (authLoading) return
    if (!isUser) return

    let interval: NodeJS.Timer | null = null

    const getDocumentsBought = async (
      data: FirestoreTransaction
    ): Promise<FullDocumentInfo[]> => {
      return await Promise.all(
        data.recipts.map(async recipt => {
          const [subjectId, docId] = recipt.path.split('/')
          return await getDocument(subjectId, docId)
        })
      )
    }

    if (transactionData == null) {
      getTransaction(transactionId)
        .then(data => {
          if (data.status === 'CREATED') {
            interval = setInterval(async () => {
              const data = await getTransaction(transactionId)
              if (data.status !== 'CREATED') {
                clearInterval(interval as NodeJS.Timer)
                setTransactionData(data)
                getDocumentsBought(data)
                  .then(res => {
                    setBought(res)
                    setIsLoading(false)
                  })
                  .catch(() => {})
              }
            }, 1000)
          } else {
            setTransactionData(data)
            getDocumentsBought(data)
              .then(res => {
                setBought(res)
                setIsLoading(false)
              })
              .catch(() => {})
          }
        })
        .catch(() => {})
    }

    // if (transactionData?.status === "SUCCEEDED") {
    //   getDocumentsBought().then((data) => setBought(data));
    // }
    // return () => clearInterval(interval);
  }, [user, transactionId, transactionData, isUser, authLoading])

  return (
    <App>
      <CompletePayDiv>
        {isLoading ? (
          <Loading />
        ) : transactionData?.status === 'SUCCEEDED' ? (
          <>
            {/* TODO: Exito */}
            <Img src="/check.svg" aspectRatio="1" height="10rem" />
            <Text
              color="secondary"
              fontSize="3rem"
              fontWeight="bold"
              margin="1rem 0 0 0"
            >
              Compra realizada con éxito
            </Text>
            <Text fontSize="1.5rem" margin="0 0 2rem 0">
              Ya puedes descargar tus apuntes
            </Text>

            {bought?.map(document => (
              <DocumentCard key={document.id} documentData={document} />
            ))}
          </>
        ) : (
          <>
            <Img src="/error.svg" aspectRatio="1" height="10rem" />
            <Text fontSize="3rem" fontWeight="bold" color="secondary">
              No se ha podido completar la compra
            </Text>
            <Text fontSize="1.5rem">
              El pago ha sido cancelado o ha habido un error
            </Text>
          </>
        )}
      </CompletePayDiv>
    </App>
  )
}
