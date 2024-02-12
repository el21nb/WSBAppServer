const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./server_details.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
