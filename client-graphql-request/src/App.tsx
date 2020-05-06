import React, { SFC } from "react";
import "./App.css";

const App: SFC<{ users: any[] }> = ({ users }) => {
  return (
    <div className="App">
      {users.map((user) => (
        <div key={user.githubLogin}>
          <img src={user.avatar} alt="" />
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default App;
