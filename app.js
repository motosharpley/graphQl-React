const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');


mongoose.connect('mongodb://localhost:27017/graphqlAPI', {useNewUrlParser: true})
.then(() => {
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}));



