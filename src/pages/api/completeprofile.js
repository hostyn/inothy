import { authAdmin, firestoreAdmin } from "../../config/firebaseadmin";
import mangopay from "../../config/mangopay";
import { isUsernameAvailable } from "../../util/api";

export default async function completeprofile(req, res) {
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

  if (userData.data().profileCompleted) {
    res.status(400).json({ error: "Profile already completed" });
    return;
  }

  const body = JSON.parse(req.body);
  const ipAddress = req.headers["x-forwarded-for"];

  if (
    body.name.length === 0 ||
    body.surname.length === 0 ||
    body.username.length === 0 ||
    body.address1.length === 0 ||
    body.city.length === 0 ||
    body.region.length === 0 ||
    body.postalCode.length === 0 ||
    body.university.length === 0 ||
    body.school.length === 0 ||
    body.degree.length === 0 ||
    body.biography.length === 0
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

  if (!body.username.match(/^[a-zA-Z][a-zA-Z\d_\-\.]{3,29}$/)) {
    res.status(400).json({ error: "Invalid username" });
    return;
  }

  if (body.biography.length < 20) {
    res.status(400).json({ error: "Biography too short" });
    return;
  }

  if (
    userData.data().username !== body.username &&
    !(await isUsernameAvailable(body.username))
  ) {
    res.status(400).json({ error: "Usernmae unavailable" });
    return;
  }

  const universitySnapshot = firestoreAdmin
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

  const userRefSnapshot = await firestoreAdmin
    .collection("referrals")
    .doc(user.uid)
    .get();

  const ref = userRefSnapshot.exists ? userRefSnapshot.data().ref : null;

  // Create mangopay user
  const createUserResponse = await mangopay.Users.create({
    FirstName: body.name,
    LastName: body.surname,
    Email: user.email,
    Address: {
      AddressLine1: body.address1,
      AddressLine2: body.address2,
      City: body.city,
      Region: body.region,
      PostalCode: body.postalCode,
      Country: "ES",
    },
    Birthday: 946684800,
    Nationality: "ES",
    CountryOfResidence: "ES",
    PersonType: "NATURAL",
    UserCategory: "OWNER",
    TermsAndConditionsAccepted: true,
  });

  const mangopayClientId = createUserResponse.Id;

  const createWalletResponse = await mangopay.Wallets.create({
    Owners: [mangopayClientId],
    Currency: "EUR",
    Description: "Inothy Wallet",
  });

  const mangopayWalletId = createWalletResponse.Id;

  const ambassador =
    new Date(userData.data().createdAt) < new Date("2022-09-01GMT+2");

  try {
    await firestoreAdmin
      .collection("users")
      .doc(user.uid)
      .update({
        profileCompleted: true,
        name: body.name,
        surname: body.surname,
        username: body.username,
        biography: body.biography,
        address: {
          address1: body.address1,
          address2: body.address2,
          city: body.city,
          region: body.region,
          postalCode: body.postalCode,
          country: "ES",
        },
        mangopayClientId: mangopayClientId,
        mangopayWalletId: mangopayWalletId,
        mangopayKYCStatus: null,
        university: body.university,
        school: body.school,
        degree: body.degree,
        ref: ref,
        ipAddress: ipAddress,
        badge: ambassador ? ["ambassador"] : [],
      });
    res.status(200).json({ status: "Success" });
    return;
  } catch {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}
