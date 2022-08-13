import React from "react";
import { useParams } from "react-router-dom";
import Users from "./users";
import UserPage from "./userPage";

const UsersList = () => {
    const params = useParams();
    const { userId } = params;

    return <>{userId ? <UserPage userId={userId} /> : <Users />}</>;
};

export default UsersList;
