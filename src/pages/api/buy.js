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
      const data = (
        await firestoreAdmin
          .collection("subjects")
          .doc(subjectId)
          .collection("docs")
          .doc(docId)
          .get()
      ).data();
      return { ...data, subjectId, docId, path: doc };
    })
  );

  let valid = documents.every((doc) => doc.createdBy !== user.uid);
  if (!valid) {
    res.status(400).json({ error: "Can not buy your own documents" });
    return;
  }

  valid = documents.every((doc) =>
    userData.bought ? !userData.bought.includes(doc.path) : true
  );
  if (!valid) {
    res.status(400).json({ error: "Already bought" });
    return;
  }

  const totalPrice = documents.reduce(
    (prev, current) => prev + parseFloat(current.price),
    0
  );

  const ipAddress = req.connection.remoteAddress;

  const response = await mangopay.PayIns.create({
    AuthorId: userData.mangopayClientId,
    CreditedWalletId: userData.mangopayWalletId,
    PaymentType: "CARD",
    ExecutionType: "DIRECT",
    DebitedFunds: {
      Currency: "EUR",
      Amount: totalPrice * 100,
    },
    Fees: {
      Currency: "EUR",
      Amount: 0,
    },
    SecureModeReturnURL: process.env.NEXT_PUBLIC_FRONTEND_URL + "/completepay",
    CardId: body.cardId,
    SecureMode: "DEFAULT",
    IpAddress: ipAddress,
    BrowserInfo: {
      AcceptHeader: body.acceptHeaders,
      JavaEnabled: body.javaEnabled,
      Language: body.language,
      ColorDepth: body.colorDepth,
      ScreenHeight: body.screenHeight,
      ScreenWidth: body.screenWidth,
      TimeZoneOffset: body.timezoneOffset,
      UserAgent: body.userAgent,
      JavascriptEnabled: true,
    },
  });

  if (response.Status === "CREATED") {
    await firestoreAdmin
      .collection("transactions")
      .doc(response.Id)
      .set({
        author: user.uid,
        authorId: response.AuthorId,
        authorWalletId: userData.mangopayWalletId,
        payInId: response.Id,
        creationDate: response.CreationDate,
        amount: totalPrice,
        status: response.Status,
        cardId: response.CardId,
        recipts: documents.map((doc) => ({
          path: doc.path,
          price: doc.price,
          createdBy: doc.createdBy,
        })),
      });
    res
      .status(200)
      .json({ status: "created", redirectUrl: response.SecureModeRedirectURL });
    return;
  }

  if (response.Status === "SUCCEEDED") {
    const recipts = await Promise.all(
      documents.map(async (document) => {
        const ownerData = (
          await firestoreAdmin.collection("users").doc(document.createdBy).get()
        ).data();

        const recipt = await mangopay.Transfers.create({
          AuthorId: userData.mangopayClientId,
          DebitedWalletId: userData.mangopayWalletId,
          CreditedWalletId: ownerData.mangopayWalletId,
          DebitedFunds: {
            Currency: "EUR",
            AMount: document.price * 100,
          },
          Fees: {
            Currency: "EUR",
            Amount: 20,
          },
        });

        return {
          path: document.path,
          price: document.price,
          createdBy: document.createdBy,
          transactionId: recipt.Id,
          creationDate: recipt.CreationDate,
          fees: recipt.Fees.Amount / 100,
        };
      })
    );

    await firestoreAdmin.collection("transactions").doc(response.Id).set({
      author: user.uid,
      authorId: response.AuthorId,
      authorWalletId: userData.mangopayWalletId,
      payInId: response.Id,
      creationDate: response.CreationDate,
      amount: totalPrice,
      status: response.Status,
      cardId: response.CardId,
      recipts: recipts,
    });

    firestoreAdmin
      .collection("users")
      .doc(user.uid)
      .update({
        bought: userData.bought
          ? [...userData.bought, ...body.products]
          : body.products,
      });

    res.status(200).json({ status: "success" });
    return;
  }

  res.status(500).json({ error: "internal server error" });
  return;
}
