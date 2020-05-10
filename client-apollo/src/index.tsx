import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { fetch } from "cross-fetch";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { gql, InMemoryCache } from "apollo-boost";
import { onError } from "apollo-link-error";
import { ApolloProvider } from "react-apollo";

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
