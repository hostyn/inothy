import ProtectedContent from "../../components/ProtectedContent";
import UploadsView from "../../views/account/Uploads";

export default function Uploads() {
  return (
    <ProtectedContent>
      <UploadsView />
    </ProtectedContent>
  );
}
