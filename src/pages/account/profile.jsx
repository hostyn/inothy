import ProtectedContent from "../../components/ProtectedContent";
import ProfileView from "../../views/account/Profile";

export default function Profile() {
  return (
    <ProtectedContent>
      <ProfileView />
    </ProtectedContent>
  );
}
