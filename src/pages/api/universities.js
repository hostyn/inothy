import admin from "../../config/firebaseadmin";

export default async function universities(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const data = await admin
      .firestore()
      .collection("universities")
      .orderBy("name")
      .get();
    const universities = data.docs.map((doc) => {
      return {
        ...doc.data(),
        ["id"]: doc.id,
      };
    });
    res.status(200).json(universities);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
