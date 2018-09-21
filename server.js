const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require("./resolvers");

require("dotenv").config({ path: 'variables.env'})
const User = require('./models/User');
const Post = require('./models/Post');

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => { console.log('DB connected')})
  .catch(err => console.log(err));      


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`Server Listening on ${url}`);
});
