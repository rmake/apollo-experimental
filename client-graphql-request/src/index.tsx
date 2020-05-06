import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { request } from "graphql-request";

const url = "http://localhost:4000/graphql";

const query = `
  query listUsers {
    allUsers {
      avatar
      name
    }
  }
`;

const mutation = `
  mutation population($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
    }
  }
`;

const render = ({ allUsers = [] }) =>
  ReactDOM.render(
    <React.StrictMode>
      <App users={allUsers} />
    </React.StrictMode>,
    document.getElementById("root")
  );

const requestAndRender = () =>
  request(url, query).then(render).catch(console.error);

const addUser = () =>
  request(url, mutation, { count: 1 })
    .then(requestAndRender)
    .catch(console.error);

requestAndRender();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
