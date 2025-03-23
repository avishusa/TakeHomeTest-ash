const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rentready-d7913-default-rtdb.firebaseio.com/"
});

module.exports = admin;
