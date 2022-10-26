import { AuthProvider } from "./authContext";
import { ModalProvider } from "./modalContext";

export default function Providers({ children, headers }) {
  return (
    <AuthProvider headers={headers}>
      <ModalProvider>{children}</ModalProvider>
    </AuthProvider>
  );
}
