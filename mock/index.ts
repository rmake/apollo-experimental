import { ApolloServer, gql } from 'apollo-server';

// Fill this in with the schema string
const typeDefs = gql`
type User {
  id: String
  photos: [Photo]
  friends: [Friendship]
}

type Photo {
  id: String!
  postedBy: User!
  taggedUser: [User]
}

type Friendship {
  friends: [User]
  connectedAt: Int
}

union AgendaItem = StudyGroup | Workout

type StudyGroup {
  name: String
  subject: String
  students: [User]
}

type Workout {
  name: String
  reps: Int
}

type CreateUserResponse {
  user: User!
}

# the schema allows the following query:
type Query {
  users: [User]
  agendas: [AgendaItem]
}

# this schema allows the following mutation:
type Mutation {
  createUser: CreateUserResponse
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;


const server = new ApolloServer({ typeDefs, mocks: true });

server.listen().then(({ url }) => {
  console.log(`server ready ad ${url}`);
});
