import { AuthProvider } from "./authContext";
import { ModalProvider } from "./modalContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ModalProvider>{children}</ModalProvider>
    </AuthProvider>
  );
}
