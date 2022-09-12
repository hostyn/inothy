import ProtectedContent from "../../components/ProtectedContent";
import BalanceView from "../../views/account/Balance";

export default function Balance() {
  return (
    <ProtectedContent>
      <BalanceView />;
    </ProtectedContent>
  );
}
