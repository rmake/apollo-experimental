import { fetch } from "cross-fetch";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { gql, InMemoryCache } from "apollo-boost";
import { onError } from "apollo-link-error";

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path ${path}`
          );
        });
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }
    }),
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      fetch: fetch,
      credentials: "same-origin",
    }),
  ]),
  cache: new InMemoryCache(),
});

const query = gql`
  {
    totalUsers
    totalPhotos
  }
`;

console.log("cache", client.extract());

client
  .query({ query })
  .then(({ data }: { data: any }) => console.log("data", data))
  .catch(console.error);

client
  .query({ query })
  .then(({ data }: { data: any }) => console.log("cache", client.extract()))
  .catch(console.error);
