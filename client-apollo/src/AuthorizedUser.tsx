import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";
import gql from "graphql-tag";
import { Query, Mutation, useApolloClient } from "react-apollo";
import { ROOT_QUERY } from "./App";
import Photos from "./Photos";
import Counter from "./Counter";

const CurrentUser = ({
  name,
  avatar,
  logout,
}: {
  name: string;
  avatar: string;
  logout: () => void;
}) => (
  <div>
    <img src={avatar} width={48} height={48} alt="" />
    <h1>{name}</h1>
    <button onClick={logout}>logout</button>
    <NavLink to="/newPhoto">Post Photo</NavLink>
    <Photos />
  </div>
);

const Me = ({
  logout,
  requestCode,
  signningIn,
}: {
  logout: () => void;
  requestCode: () => void;
  signningIn: boolean;
}) => (
  <Query query={ROOT_QUERY}>
    {({ loading, data }: { loading: boolean; data: any }) =>
      data?.me ? (
        <CurrentUser {...data.me} logout={logout} />
      ) : loading ? (
        <p>loading ...</p>
      ) : (
        <button onClick={requestCode} disabled={signningIn}>
          Sign In with GitHub
        </button>
      )
    }
  </Query>
);

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

  const client = useApolloClient();

  return (
    <>
      <Counter />
      <Mutation
        mutation={GITHUB_AUTH_MUTATION}
        update={authorizationComplete}
        refetchQueries={[{ query: ROOT_QUERY }]}
      >
        {(mutation: MutationCallback) => {
          githubAuthMutation.current = mutation;
          return (
            <Me
              signningIn={signingIn}
              requestCode={requestCode}
              logout={() => {
                localStorage.removeItem("token");
                const data = client.readQuery({ query: ROOT_QUERY });
                client.writeQuery({
                  query: ROOT_QUERY,
                  data: { ...data, me: null },
                });
              }}
            />
          );
        }}
      </Mutation>
    </>
  );
};

export default AuthorizedUser;
