import Head from "next/head";
import { getSubject } from "../../util/api";
import SubjectView from "../../views/Subject";

export default function Subject({ subjectData }) {
  return (
    <>
      <Head>
        <title>Inothy - Subject</title>
      </Head>
      <SubjectView subjectData={subjectData} />
    </>
  );
}

export async function getServerSideProps({ params: { subjectId } }) {
  try {
    const data = await getSubject(subjectId, 25);
    return {
      props: {
        subjectData: data,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
