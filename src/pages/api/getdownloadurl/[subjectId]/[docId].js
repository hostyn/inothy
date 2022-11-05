import {
  authAdmin,
  firestoreAdmin,
  storageAdmin,
} from "../../../../config/firebaseadmin";

export default async function downloadFile(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
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

  const { subjectId, docId } = req.query;

  if (!userData.bought.includes(subjectId + "/" + docId)) {
    res.status(404).json({ error: "not found" });
    return;
  }

  const docSnapshot = await firestoreAdmin
    .collection("subjects")
    .doc(subjectId)
    .collection("docs")
    .doc(docId)
    .get();

  if (!docSnapshot.exists) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const docData = docSnapshot.data();

  const [url] = await storageAdmin.file(docData.file).getSignedUrl({
    action: "read",
    expires: new Date().getTime() + 5 * 60 * 1000,
  });

  res.status(200).json({ url: url });
  return;
}
