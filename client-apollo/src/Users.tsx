import React from "react";
import { Query } from "react-apollo";
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
    <button onClick={() => refetchUsers}>Refetch Users</button>
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
