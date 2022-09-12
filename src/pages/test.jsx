import App from "../components/App";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";
import { useModal } from "../context/modalContext";
import { getDegrees } from "../util/api";

export default function Test() {
  const { logout, user } = useAuth();
  const { openModal, closeModal } = useModal();

  const handleClick = async () => {
    const data = await getDegrees(
      "3ZdipeyW7T8TTilUVBb5",
      "2FhIUOE5jzJui9zr9Ksb"
    );

    console.log(data);
  };

  return <Loading />;
}
