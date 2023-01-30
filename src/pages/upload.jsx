import Head from "next/head";
import ProtectedContent from "../components/ProtectedContent";
import UploadView from "../views/Upload/UploadPage";

export default function Upload() {
  return (
    <>
      <Head>
        <title>Inothy - Subir archivos</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ProtectedContent>
        <UploadView />
      </ProtectedContent>
    </>
  );
}
