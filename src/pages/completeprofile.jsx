import Head from "next/head";
import CompleteProfileView from "../views/CompleteProfile/CompleteProfile";

export default function CompleteProfile() {
  return (
    <>
      <Head>
        <title>Inothy: Completa tu perfil</title>
      </Head>
      <CompleteProfileView />
    </>
  );
}
