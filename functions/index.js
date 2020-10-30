const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors');

const { validateAccessCode, createNewAccessCode } = require('./APIs/user');

// Init configurations
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/create', createNewAccessCode);
app.post('/validate', validateAccessCode);

exports.api = functions.https.onRequest(app);
