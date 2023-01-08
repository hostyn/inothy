/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const MangoPay = require("mangopay2-nodejs-sdk");

const mangopay = new MangoPay({
  clientId: process.env.MANGOPAY_CLIENT_ID,
  clientApiKey: process.env.MANGOPAY_API_KEY,
  baseUrl: process.env.MANGOPAY_ENDPOINT,
});

admin.initializeApp();

exports.newUserCreated = functions.auth.user().onCreate(async (user) => {
  const {
    uid,
    email,
    metadata: { creationTime },
  } = user;

  const userData = {
    uid,
    createdAt: creationTime,
    email,
    profileCompleted: false,
  };

  await admin.firestore().doc(`users/${uid}`).set(userData);
  functions.logger.info("New user created", userData);
});

exports.mangopayKycCallback = functions.https.onRequest(async (req, res) => {
  const { originalUrl } = req;
  const urlParams = new URLSearchParams(originalUrl.substring(1));
  // const eventType = urlParams.get("EventType");
  const id = urlParams.get("RessourceId");

  const userDataSnapshot = (
    await admin
      .firestore()
      .collection("users")
      .where("mangopayKYCId", "==", id)
      .get()
  ).docs[0];

  const userData = userDataSnapshot.data();

  const kycResponse = await mangopay.Users.getKycDocument(
    userData.mangopayClientId,
    id
  );

  const userResponse = await mangopay.Users.get(userData.mangopayClientId);

  userDataSnapshot.ref.update({
    mangopayKYCStatus: kycResponse.Status,
    mangopayKYCLevel: userResponse.KYCLevel,
    mangopayKYCRefusedReasonType: kycResponse.RefusedReasonType,
    mangopayKYCRefusedReasonMessage: kycResponse.RefusedReasonMessage,
  });

  res.status(200).json({ status: "done" });
  return;
});

exports.mangopayPayinCallback = functions.https.onRequest(async (req, res) => {
  const { originalUrl } = req;
  const urlParams = new URLSearchParams(originalUrl.substring(1));
  const id = urlParams.get("RessourceId");

  const response = await mangopay.PayIns.get(id);

  const transactionSnapshot = admin
    .firestore()
    .collection("transactions")
    .doc(id);

  if (response.Status !== "SUCCEEDED") {
    transactionSnapshot.update({
      status: response.Status,
    });
    res.status(200).json({ status: "ok" });
    return;
  }

  const transaction = (await transactionSnapshot.get()).data();

  const recipts = await Promise.all(
    transaction.recipts.map(async (doc) => {
      const [subjectId, docId] = doc.path.split("/");

      const ownerData = (
        await admin.firestore().collection("users").doc(doc.createdBy).get()
      ).data();


      const recipt = await mangopay.Transfers.create({
        AuthorId: transaction.authorId,
        DebitedWalletId: transaction.authorWalletId,
        CreditedWalletId: ownerData.mangopayWalletId,
        DebitedFunds: {
          Currency: "EUR",
          Amount: doc.price * 100,
        },
        Fees: {
          Currency: "EUR",
          Amount: doc.fee * 100,
        },
      });

      // /////////////////////////

      const documentRef = admin
        .firestore()
        .collection("subjects")
        .doc(subjectId)
        .collection("docs")
        .doc(docId);

      admin.firestore().runTransaction(async (transaction) => {
        const document = await transaction.get(documentRef);
        transaction.update(documentRef, {
          sales: document.data().sales ? document.data().sales + 1 : 1,
        });
      });

      const ownerRef = admin.firestore().collection("users").doc(doc.createdBy);

      admin.firestore().runTransaction(async (transaction) => {
        const user = await transaction.get(ownerRef);
        transaction.update(ownerRef, {
          sales: user.data().sales ? user.data().sales + 1 : 1,
          badge:
            user.data().sales + 1 == 500 ?
              [...user.data().badge, "gold"] :
              user.data().sales + 1 == 200 ?
              [...user.data().badge, "silver"] :
              user.data().sales + 1 == 50 ?
              [...user.data().badge, "bronze"] :
              user.data().badge,
        });
      });

      // ///////////////////////////

      return {
        path: doc.path,
        price: doc.price,
        createdBy: doc.createdBy,
        transactionId: recipt.Id,
        creationDate: recipt.CreationDate,
        fees: recipt.Fees.Amount / 100,
      };
    })
  );

  await admin
    .firestore()
    .collection("users")
    .doc(transaction.author)
    .update({
      bought: admin.firestore.FieldValue.arrayUnion(
        ...recipts.map((doc) => doc.path)
      ),
    });

  await transactionSnapshot.update({
    status: response.Status,
    recipts: recipts,
  });

  res.status(200).json({ status: "ok" });
});
