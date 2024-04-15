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

  const og = `${process.env.NEXT_PUBLIC_FRONTEND_URL as string}/api/og?title=${
    documentData?.title as string
  }&university=${documentData?.subject.university.name as string}&subject=${
    documentData?.subject.name as string
  }&user=${documentData?.user.username as string}`

  return (
    <>
      <Head>
        <title>{documentData?.title} - Inothy</title>
        <meta name="robots" content="index,follow" />

        <meta key="og:image" property="og:image" content={og}></meta>
        <meta key="twitter:image" name="twitter:image" content={og}></meta>
      </Head>
      <DocumentView documentId={documentId} />
    </>
  )
}

export const getServerSideProps = publicContentSSR(async ctx => {
  const documentId = ctx.params?.documentId as string
  if (documentId == null) {
    return {
      notFound: true,
    }
  }
  try {
    await ctx.helper.document.getDocument.fetch({
      id: documentId,
    })
    return {
      props: {
        documentId,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
})

export default publicContent(Document)
