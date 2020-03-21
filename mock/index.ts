import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';

// Fill this in with the schema string
const schemaString = `
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

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema });

const query = `
query tasksForUser {
  posts {
    id
    title
    user {
      id
    }
    votes
  }
}
`;

graphql(schema, query).then((result) => console.log('Got result', result));
