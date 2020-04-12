import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAllCinemaDetailsQuery } from './generated/graphql'
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

function App() {
  const { data, loading } = useAllCinemaDetailsQuery({ variables: { before: '2016-04-13T08:30:25.601910+00:00' } })

  if (loading) {
    return <img src={logo} className="App-logo" alt="logo" />
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {
          data?.allCinemaDetails?.edges?.map((edge) => {
            return (
              <div>
                {edge?.node?.id}
                {edge?.node?.hallName}
                {edge?.node?.createdDate}
              </div>
            );
          })
        }
      </header>
    </div>
  );
}

const Root = () => {
  const client = useMemo(() => new ApolloClient({
    uri: 'https://etmdb.com/graphql',
  }), []);

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default Root;
