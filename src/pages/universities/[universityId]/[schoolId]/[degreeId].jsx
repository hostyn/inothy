import Head from "next/head";
import { getDegree, getSchool, getUniversity } from "../../../../util/api";
import DegreePage from "../../../../views/Degree";

export default function Degree({ degree }) {
  return (
    <>
      <Head>
        <title>
          Inothy - {degree.name} - {degree.university.name}
        </title>
      </Head>
      <DegreePage degree={degree} />
    </>
  );
}

export async function getServerSideProps({
  params: { universityId, schoolId, degreeId },
}) {
  try {
    let university = getUniversity(universityId);
    let school = getSchool(universityId, schoolId);
    const degree = await getDegree(universityId, schoolId, degreeId);
    university = await university;
    school = await school;

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
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
