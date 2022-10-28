import { firestoreAdmin } from "../../config/firebaseadmin";

export default async function test(req, res) {
  const response = { Id: "154842557" };

  const transaction = await firestoreAdmin
    .collectionGroup("transactions")
    .where("payInId", "==", response.Id)
    .get();

  transaction.docs.map((doc) => console.log(doc));
}
