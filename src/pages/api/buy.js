import mangopay from "../../config/mangopay";
import { authAdmin, firestoreAdmin } from "../../config/firebaseadmin";

export default async function createcardregistration(req, res) {
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
    console.log(error);
    res.status(401).json({ error: "Unauthorized" });
    return;
  });

  const userData = (
    await firestoreAdmin.collection("users").doc(user.uid).get()
  ).data();

  const body = JSON.parse(req.body);

  const documents = await Promise.all(
    body.products.map(async (doc) => {
      const [subjectId, docId] = doc.split("/");
      return (
        await firestoreAdmin
          .collection("subjects")
          .doc(subjectId)
          .collection("docs")
          .doc(docId)
          .get()
      ).data();
    })
  );

  const price = documents.reduce(
    (prev, current) => prev + parseFloat(current.price),
    0
  );

  const ipAddress = req.connection.remoteAddress;

  // const response = await mangopay.PayIns.create({
  //   AuthorId: userData.mangopayClientId,
  //   CreditedWalletId: userData.mangopayWalletId,
  //   PaymentType: "CARD",
  //   ExecutionType: "DIRECT",
  //   DebitedFunds: {
  //     Currency: "EUR",
  //     Amount: 1000,
  //   },
  //   Fees: {
  //     Currency: "EUR",
  //     Amount: 0,
  //   },
  //   SecureModeReturnURL: process.env.NEXT_PUBLIC_FRONTEND_URL + "/completepay",
  //   CardId: body.cardId,
  //   SecureMode: "DEFAULT",
  //   IpAddress: ipAddress,
  //   BrowserInfo: {
  //     AcceptHeader: body.acceptHeaders,
  //     JavaEnabled: body.javaEnabled,
  //     Language: body.language,
  //     ColorDepth: body.colorDepth,
  //     ScreenHeight: body.screenHeight,
  //     ScreenWidth: body.screenWidth,
  //     TimeZoneOffset: body.timezoneOffset,
  //     UserAgent: body.userAgent,
  //     JavascriptEnabled: true,
  //   },
  // });

  // console.log(response);

  res.status(200).json({ test: "test" });
}
