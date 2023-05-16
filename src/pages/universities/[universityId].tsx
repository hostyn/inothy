import { type GetServerSideProps } from 'next'
import Head from 'next/head'
import { getUniversity } from '@util/api'
import UniversityPage from '@views/University'
import type { UniversityWithSchools } from 'types/api'

interface UniversityProps {
  university: UniversityWithSchools
}

export default function University({
  university,
}: UniversityProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{`Inothy - ${university.name}`}</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <UniversityPage university={university} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const universityId = context.params?.universityId as string
  try {
    const university = await getUniversity(universityId)
    return {
      props: { university },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
