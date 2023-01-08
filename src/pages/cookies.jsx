import Head from "next/head";
import CookiesView from "../views/CookiesView";

export default function Cookies() {
  return (
    <>
      <Head>
        <title>Inothy - Cookies</title>
      </Head>
      <CookiesView />
    </>
  );
}
