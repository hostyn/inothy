import Head from 'next/head'
import { getSchool, getUniversity } from '@util/api'
import SchoolPage from '@views/School'
import type { GetServerSideProps } from 'next'
import type { SchoolWithDegree, UniversityWithSchools } from 'types/api'

interface Params {
  universityId: string
  schoolId: string
}

interface SchoolParams extends SchoolWithDegree {
  university: UniversityWithSchools
}

export default function School({
  school,
}: {
  school: SchoolParams
}): JSX.Element {
  return (
    <>
      <Head>
        <title>{`Inothy - ${school.name} - ${school.university.name}`}</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <SchoolPage school={school} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { universityId, schoolId } = context.params as unknown as Params

  try {
    const [university, school] = await Promise.all([
      getUniversity(universityId),
      getSchool(universityId, schoolId),
    ])

    return {
      props: {
        school: {
          ...school,
          university,
        },
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
