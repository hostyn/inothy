import { type GetServerSideProps } from 'next'
import Head from 'next/head'
import type { University } from 'types/api'
import { getUniversities } from '@util/api'
import UniversitiesView from '@views/Universities'

interface UniversitiesProps {
  universities: University[]
}

export default function Universities({
  universities,
}: UniversitiesProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - Universidades</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <UniversitiesView universities={universities} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const universities = await getUniversities()
  return {
    props: { universities },
  }
}
