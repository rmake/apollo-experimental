import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { fetch } from "cross-fetch";
import { ApolloClient } from "apollo-client";
import { ApolloLink, split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache, NormalizedCacheObject } from "apollo-boost";
import { onError } from "apollo-link-error";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { persistCache } from "apollo-cache-persist";
import { PersistentStorage, PersistedData } from "apollo-cache-persist/types";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const cache = new InMemoryCache();

const asyncCall = async () => {
  await persistCache({
    cache,
    storage: window.localStorage as PersistentStorage<
      PersistedData<NormalizedCacheObject>
    >,
  });

  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    fetch: fetch,
    credentials: "same-origin",
  });
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("token"),
    },
  }));

  const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/graphql",
    options: {
      reconnect: true,
    },
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

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
      authLink.concat(link),
    ]),
    cache,
  });
  ReactDOM.render(
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>,
    document.getElementById("root")
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
};

asyncCall();
