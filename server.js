const { ApolloServer, gql } = require('apollo-server');

const dev = [
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
`;

const resolvers = {
    Query: {
        getDev: () => dev
    }
};


const server = new ApolloServer({
    typeDefs, resolvers
});

server.listen(process.env.PORT).then(({ url }) => {
    console.log(`Server Listening on ${url}`);
});
