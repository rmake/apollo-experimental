import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ROOT_QUERY } from "./App";

const GITHUB_AUTH_MUTATION = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) {
      token
    }
  }
`;

type MutationCallback = (params: { variables: { code: string } }) => void;

const AuthorizedUser: React.FC<{}> = () => {
  const [signingIn, setSigningIn] = useState(false);
  const history = useHistory();
  const githubAuthMutation = useRef<MutationCallback>();

  useEffect(() => {
    if (window.location.search.match(/code=/)) {
      setSigningIn(true);
      const code = window.location.search.replace("?code=", "");
      githubAuthMutation.current &&
        githubAuthMutation.current({
          variables: { code },
        });
    }
  }, [history]);

  const requestCode = useCallback(() => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`;
  }, []);

  const authorizationComplete = useCallback(
    (cache, { data }) => {
      localStorage.setItem("token", data.githubAuth.token);
      history.replace("/");
      setSigningIn(false);
    },
    [history]
  );

  return (
    <Mutation
      mutation={GITHUB_AUTH_MUTATION}
      update={authorizationComplete}
      refetchQueries={[{ query: ROOT_QUERY }]}
    >
      {(mutation: MutationCallback) => {
        githubAuthMutation.current = mutation;
        return (
          <button onClick={requestCode} disabled={signingIn}>
            Sign In with GitHub
          </button>
        );
      }}
    </Mutation>
  );
};

export default AuthorizedUser;
