import CompletePayPage from "../views/CompletePay";

export default function CompletePay({ transactionId }) {
  return <CompletePayPage transactionId={transactionId}></CompletePayPage>;
}

export async function getServerSideProps({ query: transactionId }) {
  return { props: transactionId };
}
