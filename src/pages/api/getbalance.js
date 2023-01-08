import { authAdmin, firestoreAdmin } from "../../config/firebaseadmin";
import mangopay from "../../config/mangopay";

export default async function getBalance(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!req.headers.authorization) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  const user = await authAdmin.verifyIdToken(token).catch((error) => {
    console.log(error);
    res.status(401).json({ error: "Unauthorized" });
    return;
  });

  const userData = (
    await firestoreAdmin.collection("users").doc(user.uid).get()
  ).data();

  try {
    const response = await mangopay.Wallets.get(userData.mangopayWalletId);
    res.status(200).json({ balance: response.Balance.Amount / 100 });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
