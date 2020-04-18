import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(name: String!, description: String): Photo!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

var _id = 0;
const photos = [];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    postPhoto: (parent, args) => {
      const newPhoto = {
        id: _id++,
        ...args,
      };
      photos.push(newPhoto);

      return newPhoto;
    }
  },
  Photo: {
    url: parent => `http://example.com/image/${parent.id}.jpg`
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`GraphQL server running on ${url}`))
