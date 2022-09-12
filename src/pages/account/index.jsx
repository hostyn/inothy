import Loading from "../../components/Loading";

export default function Account() {
  return <Loading />;
}

export function getServerSideProps() {
  return { redirect: { permanent: true, destination: "/account/profile" } };
}
