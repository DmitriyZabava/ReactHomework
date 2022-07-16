import React, { useState } from "react";
import api from "./api";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleBookmarkSelect = (userId) => {
    const userIndex = users.findIndex((user) => user._id === userId);
    const newUsers = [...users];
    newUsers[userIndex].bookmark = !newUsers[userIndex].bookmark;
    setUsers(newUsers);
  };

  return (
    <div>
      <SearchStatus lenght={users.length} />
      {users.length > 0 && (
        <Users
          users={users}
          onDelete={handleDelete}
          onSelect={handleBookmarkSelect}
        />
      )}
    </div>
  );
}
export default App;
