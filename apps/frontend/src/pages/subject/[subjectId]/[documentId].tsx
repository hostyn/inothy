import { type GetServerSideProps } from 'next'
import Head from 'next/head'
import { getDocument } from '@util/api'
import DocumentPage from '@views/Document'
import type { FullDocumentInfo } from 'types/api'

interface Params {
  subjectId: string
  documentId: string
}

interface DocumentProps {
  documentData: FullDocumentInfo
}

export default function Document({ documentData }: DocumentProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{`Inothy - ${documentData.name}`}</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <DocumentPage documentData={documentData} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { subjectId, documentId } = context.params as unknown as Params

  try {
    const data = await getDocument(subjectId, documentId)
    return {
      props: {
        documentData: data,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
