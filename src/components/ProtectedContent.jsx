import { useRouter } from "next/router";
import { useAuth } from "../context/authContext";
import Loading from "./Loading";

export default function ProtectedContent({ children }) {
  const { isUser } = useAuth();
  const { push } = useRouter();

  if (!isUser) {
    push("/");
    return <Loading />;
  }

  return <>{children}</>;
}
