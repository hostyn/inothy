import { getDocument } from "../../../util/api";
import DocumentPage from "../../../views/Document";

export default function Document({ documentData }) {
  return <DocumentPage documentData={documentData} />;
}

export async function getServerSideProps({ params: { subjectId, docId } }) {
  try {
    const data = await getDocument(subjectId, docId);
    return {
      props: {
        documentData: data,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
