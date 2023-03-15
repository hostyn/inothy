import { type GetServerSideProps } from 'next'
import Head from 'next/head'
import { getSubject } from '@util/api'
import SubjectView from '@views/Subject'
import type { SubjectWithDocumentsAndUniveristy } from 'types/api'

interface Params {
  subjectId: string
}

interface SubjectProps {
  subjectData: SubjectWithDocumentsAndUniveristy
}

export default function Subject({ subjectData }: SubjectProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - Subject</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <SubjectView subjectData={subjectData} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { subjectId } = context.params as unknown as Params
  try {
    const data = await getSubject(subjectId, 25)
    return {
      props: {
        subjectData: data,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
