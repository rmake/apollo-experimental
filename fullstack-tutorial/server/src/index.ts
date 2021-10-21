import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import { createStore } from "./utils";
import resolvers from "./resolvers";

import LaunchAPI from "./datasources/launch";
import UserAPI from "./datasources/user";

const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
  }),
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});
