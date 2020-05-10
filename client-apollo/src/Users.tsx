import React from "react";
import { Query } from "react-apollo";
import { ROOT_QUERY } from "./App";

const Users = () => (
  <Query query={ROOT_QUERY}>
    {({ data, loading }: { data: any; loading: boolean }) => (
      <p>
        Users are loading:{" "}
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <UserList count={data.totalUsers} users={data.allUsers} />
        )}
      </p>
    )}
  </Query>
);

const UserListItem = ({ name, avatar }: { name: string; avatar: string }) => (
  <li>
    <img src={avatar} width={48} height={48} alt="" />
    {name}
  </li>
);

const UserList = ({ count, users }: { count: number; users: any[] }) => (
  <div>
    <p>{count} Users</p>
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
