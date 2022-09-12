import {
  authAdmin,
  firestoreAdmin,
  storageAdmin,
} from "../../config/firebaseadmin";

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

  const body = JSON.parse(req.body);

  if (!body.name) {
    res.status(400).json("Name is required");
    return;
  }

  if (!body.description) {
    res.status(400).json("Description is required");
    return;
  }

  if (!body.subject) {
    res.status(400).json("Subject is required");
    return;
  }

  if (!body.files.length) {
    res.status(400).json("Must be at least one file");
    return;
  }

  // TODO: Env variable for length
  if (body.name.length < 10) {
    res.status(400).json("Name must have at least 10 characters");
  }

  const promises = body.files.map(async (filePath) => {
    const file = storageAdmin.file(filePath);
    const fileMetadata = await file.getMetadata();
    return (
      fileMetadata[0].metadata.user === user.uid &&
      fileMetadata[0].metadata.uploadCompleted === "false"
    );
  });

  const valid = await Promise.all(promises).then((res) => res.every((r) => r));

  if (!valid) {
    res.status(400).json("Wrong files");
    return;
  }

  const updateMetadataPromises = body.files.map(async (filePath) => {
    const file = storageAdmin.file(filePath);
    await file.setMetadata({
      metadata: {
        uploadCompleted: true,
      },
    });
  });

  await Promise.all(updateMetadataPromises);

  const docs = firestoreAdmin
    .collection("subjects")
    .doc(body.subject)
    .collection("docs");

  docs.add({
    name: body.name,
    description: body.description,
    files: body.files,
    created: new Date(),
    createdBy: user.uid,
  });
}
