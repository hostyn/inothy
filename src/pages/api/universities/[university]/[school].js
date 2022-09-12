import admin from "../../../../config/firebaseadmin";

export default async function degrees(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const { university, school } = req.query;
    const data = await admin
      .firestore()
      .collection("universities")
      .doc(university)
      .collection("schools")
      .doc(school)
      .collection("degrees")
      .orderBy("name")
      .get();

    if (data.empty) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    const degrees = data.docs.map((doc) => {
      return {
        ...doc.data(),
        ["id"]: doc.id,
      };
    });
    res.status(200).json(degrees);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
