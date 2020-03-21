import { ApolloServer, gql } from 'apollo-server';

// Fill this in with the schema string
const typeDefs = gql`
type User {
  id: ID! # the ! means that every user object _must_ have an id
  firstName: String
  lastName: String
  """
  the list of Posts by this user
  """
  posts: [Post]
}

type Post {
  id: ID!
  title: String
  user: User
  votes: Int
}

# the schema allows the following query:
type Query {
  posts: [Post]
}

# this schema allows the following mutation:
type Mutation {
  upvotePost (
    postId: ID!
  ): Post
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
