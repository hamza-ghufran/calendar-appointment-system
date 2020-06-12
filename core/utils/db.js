const admin = require('firebase-admin');
const config = require('../server/config')

admin.initializeApp({
  databaseURL: config.dataSource.url,
  credential: admin.credential.cert(config.firestoreCredentials),
});

const db = admin.firestore();

module.exports = {
  Slot: db.collection('slots'),
  Event: db.collection('events')
}