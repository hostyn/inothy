import LoadingPage from "../../components/LoadingPage";

export default function Account() {
  return <LoadingPage />;
}

export function getServerSideProps() {
  return { redirect: { permanent: true, destination: "/account/profile" } };
}
