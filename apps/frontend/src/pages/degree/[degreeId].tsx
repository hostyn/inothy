import publicContent from '@middleware/publicContent'
import publicContentSSR from '@middleware/publicContentSSR'
import { trpc } from '@services/trpc'
import Degree from '@views/Degree'
import Head from 'next/head'

interface Props {
  degreeId: string
}

function Page({ degreeId }: Props): JSX.Element {
  const { data: degree } = trpc.degree.getDegree.useQuery({
    degree: degreeId,
  })

  return (
    <>
      <Head>
        <title>
          {degree?.name} - {degree?.school?.university.name} | Inothy
        </title>
        <meta name="robots" content="index,follow" />
      </Head>
      <Degree degreeId={degreeId} />
    </>
  )
}

export default publicContent(Page)

export const getServerSideProps = publicContentSSR(
  async ({ query, helper }) => {
    const { degreeId } = query

    if (typeof degreeId !== 'string') {
      return {
        notFound: true,
      }
    }

    const getDocumentsPromise = helper.degree.getDocuments.prefetchInfinite({
      degree: degreeId,
      filters: {},
    })

    const degree = await helper.degree.getDegree.fetch({ degree: degreeId })

    if (degree == null) {
      return {
        notFound: true,
      }
    }

    await getDocumentsPromise

    return {
      props: { degreeId },
    }
  }
)
