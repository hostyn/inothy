import ProtectedContent from "../../components/ProtectedContent";
import DownloadsView from "../../views/account/Downloads";

export default function Downloads() {
  return (
    <ProtectedContent>
      <DownloadsView />
    </ProtectedContent>
  );
}
