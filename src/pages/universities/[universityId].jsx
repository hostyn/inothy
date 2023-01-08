import Head from "next/head";
import { getUniversity } from "../../util/api";
import UniversityPage from "../../views/University";

export default function University({ university }) {
  return (
    <>
      <Head>
        <title>{`Inothy - ${university.name}`}</title>
      </Head>
      <UniversityPage university={university} />
    </>
  );
}

export async function getServerSideProps({ params: { universityId } }) {
  try {
    const university = await getUniversity(universityId);
    return {
      props: { university },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
