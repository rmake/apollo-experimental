import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    totalPhotos: Int!
  }

  schema {
    query: Query
  }
`;

const resolvers = {
  Query: {
    totalPhotos: () => 42,
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`GraphQL server running on ${url}`))
