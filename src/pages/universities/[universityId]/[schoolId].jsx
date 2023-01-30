import Head from "next/head";
import { getSchool, getUniversity } from "../../../util/api";
import SchoolPage from "../../../views/School";

export default function School({ school }) {
  return (
    <>
      <Head>
        <title>{`Inothy - ${school.name} - ${school.university.name}`}</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <SchoolPage school={school} />
    </>
  );
}

export async function getServerSideProps({
  params: { universityId, schoolId },
}) {
  try {
    let university = getUniversity(universityId);
    let school = getSchool(universityId, schoolId);
    university = await university;
    school = await school;

    return {
      props: {
        school: {
          ...school,
          university: university,
        },
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
