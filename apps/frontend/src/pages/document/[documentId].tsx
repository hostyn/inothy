import Head from 'next/head'
import publicContentSSR from '@middleware/publicContentSSR'
import publicContent from '@middleware/publicContent'
import DocumentView from '@views/Document/index'
import { trpc } from '@services/trpc'

interface DocumentProps {
  documentId: string
}

function Document({ documentId }: DocumentProps): JSX.Element {
  const { data: documentData } = trpc.document.getDocument.useQuery({
    id: documentId,
  })

  return (
    <>
      <Head>
        <title>{documentData?.title} - Inothy</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <DocumentView />
    </>
  )
}

export const getServerSideProps = publicContentSSR(async ctx => {
  const documentId = ctx.params?.documentId as string
  await ctx.helper.document.getDocument.prefetch({
    id: documentId,
  })
  console.log('documento', documentId)
  return {
    props: {
      documentId,
    },
  }
})

export default publicContent(Document)
