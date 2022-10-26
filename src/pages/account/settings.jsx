import ProtectedContent from "../../components/ProtectedContent";
import SettingsView from "../../views/account/Settings";

export default function Settings() {
  return (
    <ProtectedContent>
      <SettingsView />
    </ProtectedContent>
  );
}
