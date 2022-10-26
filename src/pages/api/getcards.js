import mangopay from "../../config/mangopay";
import { authAdmin, firestoreAdmin } from "../../config/firebaseadmin";

export default async function createcardregistration(req, res) {
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
    const cards = await mangopay.Users.getCards(userData.mangopayClientId, {
      // TODO: Añadir filtros
      parameters: {
        Per_Page: 50,
        Active: true,
      },
    });
    res.status(200).json(cards);
    return;
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
