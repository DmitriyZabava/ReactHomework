import React, { useState, useEffect } from "react";
import api from "./api";
import Users from "./components/users";

function App() {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    });

    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

    const handleBookmarkSelect = (userId) => {
        const userIndex = users.findIndex((user) => user._id === userId);
        const newUsers = [...users];
        newUsers[userIndex].bookmark = !newUsers[userIndex].bookmark;
        setUsers(newUsers);
    };

    return (
        <div>
            {users && (
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
