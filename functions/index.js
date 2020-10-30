const functions = require('firebase-functions');
const app = require('express')();

const { validateAccessCode, createNewAccessCode } = require('./APIs/user');

app.post('/create', createNewAccessCode);
app.post('/validate', validateAccessCode);

exports.api = functions.https.onRequest(app);
