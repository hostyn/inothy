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
});
