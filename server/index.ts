import { ApolloServer, PubSub } from "apollo-server-express";
import { GraphQLScalarType, Kind } from "graphql";
import expressPlayground from "graphql-playground-middleware-express";
import { typeDefs } from "./typeDefs";
import { MongoClient } from "mongodb";
import { githubAuth } from "./github";
import fetch from "cross-fetch";
import { createServer } from "http";
import { GraphQLUpload } from "apollo-upload-server";
import { uploadStream } from "./lib";
import * as path from "path";

const express = require("express");
const dotenv = require("dotenv");
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
      db.collection("photos").estimatedDocumentCount(),
    allPhotos: (parent, args, { db }) =>
      db.collection("photos").find().toArray(),
    totalUsers: (parent, args, { db }) =>
      db.collection("users").estimatedDocumentCount(),
    allUsers: (parent, args, { db, currentUser }) => {
      if (!currentUser) {
        return [];
      }
      return db.collection("users").find().toArray();
    },
    me: (parent, args, { currentUser }) => currentUser,
  },
  Mutation: {
    postPhoto: async (parent, args, { db, currentUser, pubsub }) => {
      if (!currentUser) {
        throw new Error("only an authorized user can post a photo");
      }

      const newPhoto = {
        ...args.input,
        userID: currentUser.githubLogin,
        createdAt: new Date(),
      };

      const { id } = await db.collection(`photos`).insertOne(newPhoto);
      newPhoto.id = id;

      const toPath = path.join(
        __dirname,
        "assets",
        "photos",
        `${newPhoto._id}.jpg`
      );

      const { createReadStream } = await args.input.file;
      const stream = createReadStream();
      await uploadStream(stream, toPath);

      pubsub.publish("photo-added", { newPhoto });

      return newPhoto;
    },
    githubAuth,
    addFakeUsers: async (parent, { count }, { db, pubsub }) => {
      const randomUserApi = `https://randomuser.me/api/?results=${count}`;
      const { results } = await fetch(randomUserApi).then((res) => res.json());
      const users = results.map((r) => ({
        githubLogin: r.login.username,
        name: `${r.name.first} ${r.name.last}`,
        avatar: r.picture.thumbnail,
        githubToken: r.login.sha1,
      }));

      await db.collection(`users`).insertMany(users);

      users.forEach((user) => {
        pubsub.publish("user-added", { newUser: user });
      });

      return users;
    },
    fakeUserAuth: async (parent, { githubLogin }, { db, pubsub }) => {
      const user = await db.collection("users").findOne({ githubLogin });

      if (!user) {
        throw new Error(`Cannot find user with githubLogin '${githubLogin}'`);
      }

      pubsub.publish("user-added", { newUser: user });

      return {
        token: user.githubToken,
        user,
      };
    },
  },
  Subscription: {
    newPhoto: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator("photo-added"),
    },
    newUser: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator("user-added"),
    },
  },
  Photo: {
    id: (parent) => parent.id || parent._id,
    url: (parent) => `http://localhost:4000/img/photos/${parent._id}.jpg`,
    postedBy: (parent, args, { db }) =>
      db.collection("users").findOne({ githubLogin: parent.userID }),
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
  Upload: GraphQLUpload,
};

const start = async () => {
  const app = express();

  const MONGO_DB = process.env.DB_HOST;
  const client = await MongoClient.connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();

  const pubsub = new PubSub();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, connection }) => {
      const githubToken = req
        ? req.headers.authorization
        : connection.context.Authorization;
      const currentUser = await db.collection("users").findOne({ githubToken });
      return { db, currentUser, pubsub };
    },
  });

  server.applyMiddleware({ app });

  app.use(
    "/img/photos",
    express.static(path.join(__dirname, "assets", "photos"))
  );

  app.get(".", (request, response) =>
    response.end("Welcome to the PhotoShare API")
  );
  app.get(
    "/playground",
    expressPlayground({
      endpoint: "/graphql",
      subscriptionEndpoint: "ws://localhost:4000/graphql",
    })
  );

  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);
  httpServer.listen({ port: 4000 }, () => {
    console.log(
      `GraphQL Server running at localhost:4000${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${4000}${
        server.subscriptionsPath
      }`
    );
  });
};

start();
