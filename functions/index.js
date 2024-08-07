const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const tvRouter = require('./routes/tv_router');

const app = express();
app.use(bodyParser.json());
app.use('/api/tv', tvRouter);

exports.api = functions.https.onRequest(app);
