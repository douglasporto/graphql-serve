const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
require("dotenv").config({ path: 'variables.env'})

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => { console.log('DB connected')})
  .catch(err => console.log(err));

const typeDefs = gql`
  type Dev {
    id: ID,
    language: String,
    typelanguage: String,
    testing: Boolean
  }
  type Query {
    getDev: [Dev]
  }
`;

const server = new ApolloServer({
  typeDefs
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`Server Listening on ${url}`);
});
