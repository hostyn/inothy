import Head from "next/head";
import PrivacyView from "../views/PrivaciyView";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Inothy - Política de privacidad</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <PrivacyView />
    </>
  );
}
