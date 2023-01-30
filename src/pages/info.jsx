import Head from "next/head";
import InfoView from "../views/Info";

export default function Info() {
  return (
    <>
      <Head>
        <title>Inothy - Información</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <InfoView />
    </>
  );
}
