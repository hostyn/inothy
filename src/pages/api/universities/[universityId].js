import { firestoreAdmin } from "../../../config/firebaseadmin";

export default async function schools(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const { universityId } = req.query;
    const universitySnapshot = firestoreAdmin
      .collection("universities")
      .doc(universityId);

    const universityData = (await universitySnapshot.get()).data();

    const schoolsData = await universitySnapshot
      .collection("schools")
      .orderBy("name")
      .get();

    if (schoolsData.empty) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    const schools = schoolsData.docs.map((doc) => {
      return {
        ...doc.data(),
        ["id"]: doc.id,
      };
    });
    res
      .status(200)
      .json({ ...universityData, id: universitySnapshot.id, schools: schools });
  } catch {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}
