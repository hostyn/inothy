import {
  authAdmin,
  firestoreAdmin,
  storageAdmin,
} from "../../config/firebaseadmin";
import makePreview from "../../util/makePreview";

export default async function upload(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!req.headers.authorization) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  const user = await authAdmin.verifyIdToken(token).catch((error) => {
    res.status(401).json({ error: "Unauthorized" });
    return;
  });

  const userDataSnapshot = firestoreAdmin.collection("users").doc(user.uid);
  const userData = (await userDataSnapshot.get()).data();

  const body = JSON.parse(req.body);

  if (!body.name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  if (!body.description) {
    res.status(400).json({ error: "Description is required" });
    return;
  }

  if (!body.subject) {
    res.status(400).json({ error: "Subject is required" });
    return;
  }

  if (!body.filePath) {
    res.status(400).json({ error: "File is required" });
    return;
  }

  // TODO: Env variable for length
  if (body.name.length < 10) {
    res.status(400).json({ error: "Name must have at least 10 characters" });
    return;
  }

  const subjectDoc = firestoreAdmin.collection("subjects").doc(body.subject);
  const subjectData = await subjectDoc.get();

  if (!subjectData.exists) {
    res.status(400).json({ error: "Subject not found" });
    return;
  }

  if (
    body.price < process.env.NEXT_PUBLIC_MIN_PRICE ||
    body.price > subjectData.data().maxPrice
  ) {
    res.status(400).json({ error: "Invalid price" });
    return;
  }

  const file = storageAdmin.file(body.filePath);
  const fileMetadata = await file.getMetadata();

  if (
    fileMetadata[0].metadata.user === user.uid &&
    fileMetadata[0].metadata.uploadCompleted === false
  ) {
    res.status(400).json("Wrong file");
    return;
  }

  await file.setMetadata({
    metadata: {
      uploadCompleted: true,
    },
  });

  const docs = subjectDoc.collection("docs");

  const fileSnapshot = await docs.add({
    name: body.name,
    description: body.description,
    file: body.filePath,
    fileName: body.filePath.split("/").at(-1),
    createdAt: new Date(),
    createdBy: user.uid,
    price: body.price,
    verificationStatus: body.requestVerification ? "pending" : "not_asked",
    rating: null,
    totalRatings: 0,
    contentType: fileMetadata[0].contentType,
    preview: false,
  });

  userDataSnapshot.update({
    uploaded: userData.uploaded
      ? [...userData.uploaded, body.subject + "/" + fileSnapshot.id]
      : [body.subject + "/" + fileSnapshot.id],
  });

  res.status(200).json({ status: "success", path: fileSnapshot.path });

  if (fileMetadata[0].contentType == "application/pdf") {
    const url = await file.getSignedUrl({
      action: "read",
      expires: new Date().getTime() + 5 * 60 * 1000,
    });

    const previewBuffer = await makePreview(url);

    const previewRef = storageAdmin.file(
      `previews/${body.subject}/${fileSnapshot.id}.pdf`
    );

    const previewStream = previewRef.createWriteStream({ resumable: false });

    previewStream.end(previewBuffer);

    fileSnapshot.update({
      preview: true,
    });
  }

  return;
}
