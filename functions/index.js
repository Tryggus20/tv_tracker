const functions = require('firebase-functions');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema.gql');
const resolvers = require('./graphql/resolvers');
const bodyParser = require('body-parser');
const tvRouter = require('./routes/tv_router');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api/tv' });

app.use(bodyParser.json());
app.use('/api/tv', tvRouter);

exports.api = functions.https.onRequest(app);
