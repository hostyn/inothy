import CompletePayPage from "../views/CompletePay";
import ProtectedContent from "../components/ProtectedContent";
import Head from "next/head";

export default function CompletePay({ transactionId }) {
  return (
    <>
      <Head>
        <title>Inothy - Completar pago</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ProtectedContent>
        <CompletePayPage transactionId={transactionId} />
      </ProtectedContent>
    </>
  );
}

export async function getServerSideProps({ query: transactionId }) {
  return { props: transactionId };
}
