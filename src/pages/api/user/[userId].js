import { firestoreAdmin } from "../../../config/firebaseadmin";

export default async function user(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { userId } = req.query;

  const userSnapshot = firestoreAdmin.collection("users").doc(userId);
  const userData = (await userSnapshot.get()).data();

  const univseristySnapshot = firestoreAdmin
    .collection("universities")
    .doc(userData.university);

  const universityData = (await univseristySnapshot.get()).data();

  const schoolSnapshot = univseristySnapshot
    .collection("schools")
    .doc(userData.school);

  const schoolData = (await schoolSnapshot.get()).data();

  const degreeData = (
    await schoolSnapshot.collection("degrees").doc(userData.degree).get()
  ).data();

  res.status(200).json({
    username: userData.username,
    uploaded: userData.uploaded,
    university: universityData,
    school: schoolData,
    degree: degreeData,
    biography: userData.biography,
  });
}
