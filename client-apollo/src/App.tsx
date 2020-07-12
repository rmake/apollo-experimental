import React from "react";
import { gql } from "apollo-boost";
import Users from "./Users";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthorizedUser from "./AuthorizedUser";
import PostPhoto from "./PostPhoto";

export const ROOT_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      ...userInfo
    }
    me {
      ...userInfo
    }
    allPhotos {
      id
      name
      url
    }
  }

  fragment userInfo on User {
    githubLogin
    name
    avatar
  }
`;

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        component={() => (
          <>
            <AuthorizedUser />
            <Users />{" "}
          </>
        )}
      />
      <Route path="/newPhoto" component={PostPhoto} />
      <Route
        component={({ location }: { location: any }) => (
          <h1>"{location.pathname}" not found</h1>
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default App;
