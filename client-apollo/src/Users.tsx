import React from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { ROOT_QUERY } from "./App";

const Users = () => (
  <Query query={ROOT_QUERY} pollInterval={1000}>
    {({
      data,
      loading,
      refetch,
    }: {
      data: any;
      loading: boolean;
      refetch: () => void;
    }) => (
      <div>
        Users are loading:{" "}
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <UserList
            count={data.totalUsers}
            users={data.allUsers}
            refetchUsers={refetch}
          />
        )}
      </div>
    )}
  </Query>
);

const ADD_FAKE_USERS_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`;

const UserListItem = ({ name, avatar }: { name: string; avatar: string }) => (
  <li>
    <img src={avatar} width={48} height={48} alt="" />
    {name}
  </li>
);

const UserList = ({
  count,
  users,
  refetchUsers,
}: {
  count: number;
  users: any[];
  refetchUsers: () => void;
}) => (
  <div>
    <p>{count} Users</p>
    <button onClick={() => refetchUsers()}>Refetch Users</button>
    <Mutation
      mutation={ADD_FAKE_USERS_MUTATION}
      variables={{ count: 1 }}
      refetchQueries={[{ query: ROOT_QUERY }]}
    >
      {(addFakeUsers: () => void) => (
        <button onClick={addFakeUsers}>Add Fake Users</button>
      )}
    </Mutation>
    <ul>
      {users.map((user: any) => (
        <UserListItem
          key={user.githubLogin}
          name={user.name}
          avatar={user.avatar}
        />
      ))}
    </ul>
  </div>
);

export default Users;
