import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar DateTime

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
    createdAt: DateTime!
  }

  type Query {
    totalPhotos: Int!
    allPhotos(after: DateTime): [Photo!]!
    totalUsers: Int!
    allUsers: [User!]!
    me: User
  }

  type AuthPayload {
    token: String
    user: User!
  }

  input PostPhotoInput {
    name: String!
    category: PhotoCategory = PORTRAIT
    description: String
  }

  type Mutation {
    postPhoto(input: PostPhotoInput): Photo!
    githubAuth(code: String!): AuthPayload
    addFakeUsers(count: Int = 1): [User!]!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
