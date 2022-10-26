import { useAuth } from "../context/authContext";
import registerCard from "../util/cardregistration";

export default function Test({}) {
  const { headers } = useAuth();
  console.log(headers);
  const { user } = useAuth();
  const handleTest = async () => {
    const response = await registerCard(user, 4970105181854329, 1124, 111);
    console.log(response);
  };
  return <button onClick={handleTest}>Test</button>;
}
