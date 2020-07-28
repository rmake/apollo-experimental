import React, { useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useApolloClient, useQuery } from "react-apollo";

const query = gql`
  {
    count {
      count
    }
  }
`;

const Counter = () => {
  const client = useApolloClient();

  const { data } = useQuery(query, { fetchPolicy: "cache-only" });

  useEffect(() => {
    client.writeQuery({
      query,
      data: {
        count: {
          __typename: "counter",
          count: 0,
        },
      },
    });
  }, [client]);

  const increment = useCallback(() => {
    client.writeQuery({
      query,
      data: {
        count: {
          __typename: "counter",
          count: data.count.count + 1,
        },
      },
    });
  }, [client, data]);

  const decrement = useCallback(() => {
    client.writeQuery({
      query,
      data: {
        count: {
          __typename: "counter",
          count: data.count.count - 1,
        },
      },
    });
  }, [client, data]);

  return (
    <div>
      {data?.count?.count || 0}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default Counter;
