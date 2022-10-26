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

  const userData = await firestoreAdmin.collection("users").doc(user.uid).get();

  if (userData.data().mangopayType !== "OWNER") {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

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

  if (!body.files.length) {
    res.status(400).json({ error: "Must be at least one file" });
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

  const docs = subjectDoc.collection("docs");

  docs.add({
    name: body.name,
    description: body.description,
    files: body.files,
    createdAt: new Date(),
    createdBy: user.uid,
    price: body.price,
    verificationStatus: body.requestVerification ? "pending" : "not_asked",
    rating: null,
    totalRatings: 0,
  });
  res.status(200).json({ status: "success" });
  return;
}
