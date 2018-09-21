const { ApolloServer, gql } = require('apollo-server');

const devs = [
  {
    id: 1,
    language: 'Javascript',
    typelanguage: 'Frontend',
    testing: false
  },
  {
    id: 2,
    language: 'PHP',
    typelanguage: 'Backend',
    testing: false
  },
  {
    id: 3,
    language: 'Graphql',
    typelanguage: 'Backend',
    testing: true
  },
];

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
  type Mutation {
    addDev(
      language: String,
      typelanguage: String,
      testing: Boolean
    ): Dev
  }
`;

const resolvers = {
  Query: {
    getDev: () => devs
  },
  Mutation: {
    addDev: (_, {language, typelanguage, testing }) => {
      const dev = { language, typelanguage, testing };
      devs.push(dev);
      return dev;
    }
  }
};


const server = new ApolloServer({
  typeDefs, resolvers
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`Server Listening on ${url}`);
});
