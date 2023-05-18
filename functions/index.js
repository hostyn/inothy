/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const MangoPay = require("mangopay2-nodejs-sdk");
const { default: algoliasearch } = require("algoliasearch");
const { Timestamp } = require("firebase-admin/firestore");

const MANGOPAY_CLIENT_ID = functions.config().mangopay.id;
const MANGOPAY_API_KEY = functions.config().mangopay.key;
const MANGOPAY_ENDPOINT = functions.config().mangopay.endpoint;

const ALGOLIA_APP_ID = functions.config().algolia.app;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.key;
const ALGOLIA_INDEX = functions.config().algolia.index;

const mangopay = new MangoPay({
  clientId: MANGOPAY_CLIENT_ID,
  clientApiKey: MANGOPAY_API_KEY,
  baseUrl: MANGOPAY_ENDPOINT,
});

const algolia = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const algoliaIndex = algolia.initIndex(ALGOLIA_INDEX);

admin.initializeApp();

exports.newUserCreated = functions
    .region("europe-west1")
    .auth.user()
    .onCreate(async (user) => {
      const {
        uid,
        email,
        metadata: { creationTime },
      } = user;

      const userData = {
        uid,
        createdAt: Timestamp.fromDate(new Date(creationTime)),
        email,
        profileCompleted: false,
      };

      await admin.firestore().doc(`users/${uid}`).set(userData);
      functions.logger.info("New user created", userData);
    });

exports.mangopayKycCallback = functions
    .region("europe-west1")
    .https.onRequest(async (req, res) => {
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
          id,
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

exports.mangopayPayinCallback = functions
    .region("europe-west1")
    .https.onRequest(async (req, res) => {
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
              await admin
                  .firestore()
                  .collection("users")
                  .doc(doc.createdBy)
                  .get()
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

            const ownerRef = admin
                .firestore()
                .collection("users")
                .doc(doc.createdBy);

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
          }),
      );

      await admin
          .firestore()
          .collection("users")
          .doc(transaction.author)
          .update({
            bought: admin.firestore.FieldValue.arrayUnion(
                ...recipts.map((doc) => doc.path),
            ),
          });

      await transactionSnapshot.update({
        status: response.Status,
        recipts: recipts,
      });

      res.status(200).json({ status: "ok" });
    });

// UNIVERSITY //

exports.addUniversityToIndex = functions
    .region("europe-west1")
    .firestore.document("universities/{universityId}")
    .onCreate((snapshot, context) => {
      const data = snapshot.data();
      const { universityId } = context.params;
      return algoliaIndex.saveObject({
        ...data,
        objectID: universityId,
        type: "university",
      });
    });

exports.updateUniversityToIndex = functions
    .region("europe-west1")
    .firestore.document("universities/{universityId}")
    .onUpdate((change, context) => {
      const data = change.after.data();
      const { universityId } = context.params;
      return algoliaIndex.saveObject({
        ...data,
        objectID: universityId,
        type: "university",
      });
    });

exports.deleteUniversityFromIndex = functions
    .region("europe-west1")
    .firestore.document("universities/{universityId}")
    .onDelete((snapshot, context) => {
      const { universityId } = context.params;
      return algoliaIndex.deleteObject(universityId);
    });

// SCHOOL //

exports.addSchoolToIndex = functions
    .region("europe-west1")
    .firestore.document("universities/{universityId}/schools/{schoolId}")
    .onCreate(async (snapshot, context) => {
      const { universityId, schoolId } = context.params;
      const objectID = universityId + "/" + schoolId;

      const data = snapshot.data();

      const universityData = (
        await admin
            .firestore()
            .collection("universities")
            .doc(universityId)
            .get()
      ).data();

      return algoliaIndex.saveObject({
        ...data,
        objectID,
        type: "school",
        universityName: universityData.name,
        logoUrl: universityData.logoUrl,
      });
    });

exports.updateSchoolToIndex = functions
    .region("europe-west1")
    .firestore.document("universities/{universityId}/schools/{schoolId}")
    .onUpdate(async (change, context) => {
      const { universityId, schoolId } = context.params;
      const objectID = universityId + "/" + schoolId;

      const data = change.after.data();

      const universityData = (
        await admin
            .firestore()
            .collection("universities")
            .doc(universityId)
            .get()
      ).data();

      return algoliaIndex.saveObject({
        ...data,
        objectID,
        type: "school",
        universityName: universityData.name,
        logoUrl: universityData.logoUrl,
      });
    });

exports.deleteSchoolFromIndex = functions
    .region("europe-west1")
    .firestore.document("universities/{universityId}/schools/{schoolId}")
    .onDelete((snapshot, context) => {
      const { universityId, schoolId } = context.params;
      const objectID = universityId + "/" + schoolId;
      return algoliaIndex.deleteObject(objectID);
    });

// DEGREE //

exports.addDegreeToIndex = functions
    .region("europe-west1")
    .firestore.document(
        "universities/{universityId}/schools/{schoolId}/degrees/{degreeId}",
    )
    .onCreate(async (snapshot, context) => {
      const { universityId, schoolId, degreeId } = context.params;
      const objectID = universityId + "/" + schoolId + "/" + degreeId;

      const data = snapshot.data();

      const universityData = (
        await admin
            .firestore()
            .collection("universities")
            .doc(universityId)
            .get()
      ).data();

      const degreeData = (
        await admin
            .firestore()
            .collection("universities")
            .doc(universityId)
            .collection("schools")
            .doc(schoolId)
            .get()
      ).data();

      return algoliaIndex.saveObject({
        objectID,
        name: data.name,
        type: "degree",
        universityName: universityData.name,
        logoUrl: universityData.logoUrl,
        schoolName: degreeData.name,
      });
    });

exports.updateDegreeToIndex = functions
    .region("europe-west1")
    .firestore.document(
        "universities/{universityId}/schools/{schoolId}/degrees/{degreeId}",
    )
    .onUpdate(async (change, context) => {
      const { universityId, schoolId, degreeId } = context.params;
      const objectID = universityId + "/" + schoolId + "/" + degreeId;

      const data = change.after.data();

      const universityData = (
        await admin
            .firestore()
            .collection("universities")
            .doc(universityId)
            .get()
      ).data();

      const degreeData = (
        await admin
            .firestore()
            .collection("universities")
            .doc(universityId)
            .collection("schools")
            .doc(schoolId)
            .get()
      ).data();

      return algoliaIndex.saveObject({
        objectID,
        name: data.name,
        type: "degree",
        universityName: universityData.name,
        logoUrl: universityData.logoUrl,
        schoolName: degreeData.name,
      });
    });

exports.deleteDegreeFromIndex = functions
    .region("europe-west1")
    .firestore.document(
        "universities/{universityId}/schools/{schoolId}/degrees/{degreeId}",
    )
    .onDelete((snapshot, context) => {
      const { universityId, schoolId, degreeId } = context.params;
      const objectID = universityId + "/" + schoolId + "/" + degreeId;
      return algoliaIndex.deleteObject(objectID);
    });

// SUBJECT //

exports.addSubjectToIndex = functions
    .region("europe-west1")
    .firestore.document("subjects/{subjectId}")
    .onCreate(async (snapshot, context) => {
      const { subjectId } = context.params;

      const data = snapshot.data();

      const universityData = (
        await admin
            .firestore()
            .collection("universities")
            .doc(data.university)
            .get()
      ).data();

      return algoliaIndex.saveObject({
        objectID: subjectId,
        code: data.code,
        name: data.name,
        type: "subject",
        universityName: universityData.name,
        logoUrl: universityData.logoUrl,
      });
    });

exports.updateSubejctToIndex = functions
    .region("europe-west1")
    .firestore.document("subjects/{subjectId}")
    .onUpdate(async (change, context) => {
      const { subjectId } = context.params;

      const data = change.after.data();

      const universityData = (
        await admin
            .firestore()
            .collection("universities")
            .doc(data.university)
            .get()
      ).data();

      return algoliaIndex.saveObject({
        objectID: subjectId,
        code: data.code,
        name: data.name,
        type: "subject",
        universityName: universityData.name,
        logoUrl: universityData.logoUrl,
      });
    });

exports.deleteSubjectFromIndex = functions
    .region("europe-west1")
    .firestore.document("subjects/{subjectId}")
    .onDelete((snapshot, context) => {
      const { subjectId } = context.params;
      return algoliaIndex.deleteObject(subjectId);
    });
