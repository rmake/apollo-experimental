import { ApolloServer } from "apollo-server-express";
import { GraphQLScalarType, Kind } from "graphql";
import expressPlayground from 'graphql-playground-middleware-express';
import { typeDefs } from './typeDefs';
import { MongoClient } from 'mongodb';
import { githubAuth } from './github';
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

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
    totalPhotos: (parent, args, { db }) =>
      db.collection('photos').estimatedDocumentCount(),
    allPhotos: (parent, args, { db }) =>
      db.collection('photos').find().toArray(),
    totalUsers: (parent, args, { db }) =>
      db.collection('users').estimatedDocumentCount(),
    allUsers: (parent, args, { db }) =>
      db.collection('users').find().toArray(),
    me: (parent, args, { currentUser }) => currentUser,
  },
  Mutation: {
    postPhoto: async (parent, args, { db, currentUser }) => {
      if (!currentUser) {
        throw new Error('only an authorized user can post a photo');
      }

      const newPhoto = {
        ...args.input,
        userID: currentUser.githubLogin,
        createdAt: new Date(),
      };

      const { insertedIds } = await db.collection(`photos`).insert(newPhoto)
      newPhoto.id = insertedIds[0];

      return newPhoto;
    },
    githubAuth,
  },
  Photo: {
    id: parent => parent.id || parent._id,
    url: (parent) => `/img/photos/${parent._id}.jpg`,
    postedBy: (parent, args, { db }) =>
      db.collection('users').findOne({ githubLogin: parent.userID }),
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


const start = async () => {
  const app = express();

  const MONGO_DB = process.env.DB_HOST;
  const client = await MongoClient.connect(
    MONGO_DB,
    { useNewUrlParser: true },
  );
  const db = client.db();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const githubToken = req.headers.authorization;
      const currentUser = await db.collection('users').findOne({ githubToken })
      return { db, currentUser }
    },
  });

  server.applyMiddleware({ app });

  app.get('.', (request, response) => response.end("Welcome to the PhotoShare API"));
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

  app.listen({ port: 4000 }, () =>
    console.log(`GraqhQL Server running @ http://localhost:4000${server.graphqlPath}`)
  );
}

start();
