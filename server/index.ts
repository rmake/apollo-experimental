import { ApolloServer } from "apollo-server-express";
import { GraphQLScalarType, Kind } from "graphql";
import expressPlayground from 'graphql-playground-middleware-express';
import { typeDefs } from './typeDefs';
const express = require('express');

var _id = 3;
var users = [
  { githubLogin: "mHattrup", name: "Mike Hattrup" },
  { githubLogin: "gPlake", name: "Glen Plake" },
  { githubLogin: "sSchmidt", name: "Scot Schmidt" },
];
const photos = [
  {
    id: "1",
    name: "Dropping the Heart Chute",
    description: "The heart chute is one of my favorite chutes",
    category: "ACTION",
    githubUser: "gPlake",
    createdAt: "3-28-1977",
  },
  {
    id: "2",
    name: "Enjoying the sunshine",
    category: "SELFIE",
    githubUser: "sSchmidt",
    createdAt: "1-2-1985",
  },
  {
    id: "3",
    name: "Gunbarrel 25",
    description: "25 laps on gunbarrel today",
    category: "LANDSCAPE",
    githubUser: "sSchmidt",
    createdAt: "2018-04-15T19:09:57.308Z",
  },
];

const tags = [
  { photoID: "1", userID: "gPlake" },
  { photoID: "2", userID: "sSchmidt" },
  { photoID: "2", userID: "mHattrup" },
  { photoID: "2", userID: "gPlake" },
];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: (parent, args) => photos.filter(photo => (!args.after || new Date(args.after).getTime() < new Date(photo.createdAt).getTime())),
  },
  Mutation: {
    postPhoto: (parent, args) => {
      const newPhoto = {
        id: _id++,
        ...args.input,
      };
      photos.push(newPhoto);
      return newPhoto;
    },
  },
  Photo: {
    url: (parent) => `http://example.com/image/${parent.id}.jpg`,
    postedBy: (parent) =>
      users.find((u) => u.githubLogin === parent.githubUser),
    taggedUsers: (parent) =>
      tags
        .filter((tag) => tag.photoID === parent.id)
        .map((tag) => tag.userID)
        .map((userID) => users.find((u) => u.githubLogin === userID)),
  },
  User: {
    postedPhotos: (parent) =>
      photos.filter((p) => p.githubUser === parent.githubUser),
    inPhotos: (parent) =>
      tags
        .filter((tag) => tag.userID === parent.id)
        .map((tag) => tag.photoID)
        .map((photoID) => photos.find((photo) => photoID === photo.id)),
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value",
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast) => {
      if (ast.kind === Kind.STRING) return ast.value;
      return null;
    },
  }),
};

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.get('.', (request, response) => response.end("Welcome to the PhotoShare API"));
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

app.listen({ port: 4000 }, () =>
  console.log(`GraqhQL Server running @ http://localhost:4000${server.graphqlPath}`)
)
