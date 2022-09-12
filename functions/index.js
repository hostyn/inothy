const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.newUserCreated = functions.auth.user().onCreate( async (user) => {
  const {
    uid,
    email,
    metadata: {creationTime},
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
