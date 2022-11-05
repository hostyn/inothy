import Head from "next/head";
import { getUniversities } from "../util/api";
import UniversitiesView from "../views/Universities";

export default function Universities({ universities }) {
  return (
    <>
      <Head>
        <title>Inothy - Universidades</title>
      </Head>
      <UniversitiesView universities={universities} />
    </>
  );
}

export async function getServerSideProps(context) {
  const universities = await getUniversities();
  return {
    props: { universities },
  };
}
