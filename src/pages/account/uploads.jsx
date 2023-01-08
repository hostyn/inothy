import Head from "next/head";
import ProtectedContent from "../../components/ProtectedContent";
import UploadsView from "../../views/Account/Uploads";

export default function Uploads() {
  return (
    <>
      <Head>
        <title>Inothy - Subido</title>
      </Head>
      <ProtectedContent>
        <UploadsView />
      </ProtectedContent>
    </>
  );
}
