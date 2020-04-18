import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    totalPhotos: Int!
  }

  type Mutation {
    postPhoto(name: String!, description: String): Boolean!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const photos = [];

const resolvers = {
  Query: {
    totalPhotos: () => 42,
  },
  Mutation: {
    postPhoto: (parent, args) => {
      photos.push(args);
      return true;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`GraphQL server running on ${url}`))
