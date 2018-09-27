const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import Resolver and TypeDefs
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require("./resolvers");

// Import Environment Variables and Mogoose Models
require("dotenv").config({ path: 'variables.env'})
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to MLab Database
mongoose
  .connect(
    process.env.MONGO_URI,
    { useCreateIndex: true, useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// Create Apollo/GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});


// server.listen(4000).then(({ url }) => {
//   console.log(`Server listening on ${url}`);
// });

server.listen(4000).then(({ url }) => {
  console.log(`Server Listening on ${url}`);
});
