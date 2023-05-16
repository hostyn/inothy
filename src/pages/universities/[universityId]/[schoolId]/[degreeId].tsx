import Head from 'next/head'
import { getDegree, getSchool, getUniversity } from '@util/api'
import DegreePage from '@views/Degree'
import { type GetServerSideProps } from 'next'
import type { DegreeWithDocuments, University } from 'types/api'

interface Params {
  universityId: string
  schoolId: string
  degreeId: string
}

interface DegreeProps extends DegreeWithDocuments {
  school: { id: string; name: string }
  university: University
}

export default function Degree({
  degree,
}: {
  degree: DegreeProps
}): JSX.Element {
  return (
    <>
      <Head>
        <title>{`Inothy - ${degree.name} - ${degree.university.name}`}</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <DegreePage degree={degree} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { universityId, schoolId, degreeId } =
    context.params as unknown as Params
  try {
    const [university, school, degree] = await Promise.all([
      getUniversity(universityId),
      getSchool(universityId, schoolId),
      getDegree(universityId, schoolId, degreeId),
    ])

    return {
      props: {
        degree: {
          ...degree,
          school: { id: school.id, name: school.name },
          university: {
            id: university.id,
            name: university.name,
            logoUrl: university.logoUrl,
            symbol: university.symbol,
            url: university.url,
          },
        },
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
