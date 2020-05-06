import { request } from "graphql-request";

const url = "http://localhost:4000/graphql";

const mutation = `
  mutation population($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
    }
  }
`;

const variables = { count: 3 };

request(url, mutation, variables).then(console.log).catch(console.error);
