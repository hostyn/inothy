import { getUniversity } from "../../util/api";
import UniversityPage from "../../views/University";

export default function University({ university }) {
  return <UniversityPage university={university} />;
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
