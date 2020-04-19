import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
  }

  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }

  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory!
    postedBy: User!
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  input PostPhotoInput {
    name: String!
    category: PhotoCategory=PORTRAIT
    description: String
  }

  type Mutation {
    postPhoto(input: PostPhotoInput): Photo!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

var _id = 3;
var users = [
  { "githubLogin": "mHattrup", "name": "Mike Hattrup" },
  { "githubLogin": "gPlake", "name": "Glen Plake" },
  { "githubLogin": "sSchmidt", "name": "Scot Schmidt" }
];
const photos = [
  { "id": "1", "name": "Dropping the Heart Chute", "description": "The heart chute is one of my favorite chutes", "category": "ACTION", "githubUser": "gPlake" },
  { "id": "2", "name": "Enjoying the sunshine", "category": "SELFIE", "githubUser": "sSchmidt" },
  { "id": "3", "name": "Gunbarrel 25", "description": "25 laps on gunbarrel today", "category": "LANDSCAPE", "githubUser": "sSchmidt" }
];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    postPhoto: (parent, args) => {
      const newPhoto = {
        id: _id++,
        ...args.input,
      };
      photos.push(newPhoto);
      return newPhoto;
    }
  },
  Photo: {
    url: parent => `http://example.com/image/${parent.id}.jpg`,
    postedBy: parent =>
      users.find(u => u.githubLogin == parent.githubUser),
  },
  User: {
    postedPhotos: parent =>
      photos.filter(p =>  p.githubUser == parent.githubUser),
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`GraphQL server running on ${url}`))
