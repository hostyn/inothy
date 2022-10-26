import { useRouter } from "next/router";
import { useAuth } from "../context/authContext";
import LoadingPage from "./LoadingPage";

export default function ProtectedContent({ children }) {
  const { isUser } = useAuth();
  const { push } = useRouter();

  if (!isUser) {
    push("/");
    return <LoadingPage />;
  }

  return <>{children}</>;
}
