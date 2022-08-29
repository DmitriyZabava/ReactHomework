import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import Loader from "../../common/loader";
import Qualities from "../../ui/qualities";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleClick = () => history.push("/users");

    if (user) {
        return (
            <>
                <div className="m-1">
                    <h1>{user.name}</h1>
                    <h3>Профессия : {user.profession.name}</h3>
                    <Qualities qualities={user.qualities} />
                    <h5>Встретился раз : {user.completedMeetings} </h5>
                    <h3>Оценка : {user.rate} </h3>
                </div>{" "}
                <button className="btn btn-warning" onClick={handleClick}>
                    Все Пользователи
                </button>
            </>
        );
    } else {
        return <Loader />;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
