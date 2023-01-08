import Head from "next/head";
import { getUser } from "../../util/api";
import User from "../../views/User";

export default function UserPage({ userData }) {
  return (
    <>
      <Head>
        <title>Inothy - {userData.username}</title>
      </Head>
      <User userData={userData} />
    </>
  );
}

export async function getServerSideProps({ params: { userId } }) {
  const userData = await getUser(userId);
  return { props: { userData } };
}
