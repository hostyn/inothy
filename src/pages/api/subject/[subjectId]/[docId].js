import { firestoreAdmin } from "../../../../config/firebaseadmin";

export default async function Document(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  try {
    const { subjectId, docId } = req.query;

    const docSnapshot = firestoreAdmin
      .collection("subjects")
      .doc(subjectId)
      .collection("docs")
      .doc(docId);

    let docData = await docSnapshot.get();

    if (!docData.exists) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    docData = docData.data();

    const creatorData = (
      await firestoreAdmin.collection("users").doc(docData.createdBy).get()
    ).data();

    res.status(200).json({
      subjectId: subjectId,
      docId: docId,
      createdAt: docData.createdAt,
      createdBy: creatorData.username,
      description: docData.description,
      file: docData.file,
      fileName: docData.fileName,
      name: docData.name,
      price: docData.price,
      rating: docData.rating,
      totalRatings: docData.totalRatings,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
}
