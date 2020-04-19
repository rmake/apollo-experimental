import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
    inPhotos: [Photo!]!
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
    taggedUsers: [User!]!
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
  { "githubLogin": "sSchmidt", "name": "Scot Schmidt" },
];
const photos = [
  { "id": "1", "name": "Dropping the Heart Chute", "description": "The heart chute is one of my favorite chutes", "category": "ACTION", "githubUser": "gPlake" },
  { "id": "2", "name": "Enjoying the sunshine", "category": "SELFIE", "githubUser": "sSchmidt" },
  { "id": "3", "name": "Gunbarrel 25", "description": "25 laps on gunbarrel today", "category": "LANDSCAPE", "githubUser": "sSchmidt" },
];

const tags = [
  { "photoID": "1", "userID": "gPlake" },
  { "photoID": "2", "userID": "sSchmidt" },
  { "photoID": "2", "userID": "mHattrup" },
  { "photoID": "2", "userID": "gPlake" },
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
      users.find(u => u.githubLogin === parent.githubUser),
    taggedUsers: parent =>
      tags.filter(tag => tag.photoID === parent.id).map(tag => tag.userID)
        .map(userID => users.find(u => u.githubLogin === userID)),
  },
  User: {
    postedPhotos: parent =>
      photos.filter(p =>  p.githubUser === parent.githubUser),
    inPhotos: parent =>
      tags.filter(tag => tag.userID === parent.id).map(tag => tag.photoID)
        .map(photoID => photos.find(photo => photoID === photo.id)),
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`GraphQL server running on ${url}`))
