import Head from "next/head";
import ProtectedContent from "../../components/ProtectedContent";
import ProfileView from "../../views/Account/Profile";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Inothy - Cuenta</title>
      </Head>
      <ProtectedContent>
        <ProfileView />
      </ProtectedContent>
    </>
  );
}
