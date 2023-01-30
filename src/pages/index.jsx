import Head from "next/head";
import HomeView from "../views/Home";

export default function Home() {
  return (
    <>
      <Head>
        <title>Inothy: Prepárate para aprobar</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <HomeView />
    </>
  );
}
