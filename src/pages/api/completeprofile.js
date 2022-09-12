import admin from "../../config/firebaseadmin";
import { isUsernameAvailable } from "../../util/api";

export default async function completeprofile(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }

  if (!req.headers.authorization) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  const user = await admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      res.status(401).json({ error: "Unauthorized" });
      return;
    });

  const userData = await admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get();

  if (userData.data().profileCompleted) {
    res.status(400).json({ error: "Profile already completed" });
    return;
  }

  const body = JSON.parse(req.body);

  if (
    body.name.length === 0 ||
    body.surname.length === 0 ||
    body.username.length === 0 ||
    body.university.length === 0 ||
    body.school.length === 0 ||
    body.degree.length === 0
  ) {
    res.status(400).json({ error: "Missing params" });
    return;
  }

  if (!body.name.match(/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/)) {
    res.status(400).json({ error: "Invalid Name" });
    return;
  }

  if (
    !body.surname.match(/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/)
  ) {
    res.status(400).json({ error: "Invalid Surname" });
    return;
  }

  if (!(await isUsernameAvailable(body.username))) {
    res.status(400).json({ error: "Usernmae unavailable" });
    return;
  }

  const universitySnapshot = admin
    .firestore()
    .collection("universities")
    .doc(body.university);

  if (!(await universitySnapshot.get()).exists) {
    res.status(400).json({ error: "Invalid params" });
    return;
  }

  const schoolSnapshot = universitySnapshot
    .collection("schools")
    .doc(body.school);

  if (!(await schoolSnapshot.get()).exists) {
    res.status(400).json({ error: "Invalid params" });
    return;
  }

  const degreeSnapshot = schoolSnapshot.collection("degrees").doc(body.degree);

  if (!(await degreeSnapshot.get()).exists) {
    res.status(400).json({ error: "Invalid params" });
    return;
  }

  try {
    await admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        profileCompleted: true,
        name: body.name,
        surname: body.surname,
        username: body.username,
        university: body.university,
        school: body.school,
        degree: body.degree,
        ref: body.ref || null,
      });
    res.status(200).json({ status: "done" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
