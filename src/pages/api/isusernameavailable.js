import admin from "../../config/firebaseadmin";

export default async function isUsernameAvailable(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  const username = req.query.username;
  if (!username) {
    res.status(400).json({ error: "Username is not defined" });
    return;
  }

  try {
    const doc = await admin
      .firestore()
      .collection("users")
      .where("username", "==", username)
      .get();
    if (doc.empty) {
      res.status(200).json({ available: true });
      return;
    }
    res.status(200).json({ available: false });
    return;
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
}
