import ProtectedContent from "../components/ProtectedContent";
import UploadView from "../views/Upload";

export default function Upload() {
  return (
    <ProtectedContent>
      <UploadView />
    </ProtectedContent>
  );
}
