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

    const handleClick = () => history.push(`/users/${userId}/edit`);
    const handleReturn = () => history.push("/users");
    if (user) {
        return (
            <>
                <div className="d-grid gap-2 col-6 mx-auto shadow">
                    <h1>{user.name}</h1>
                    <h6>Пол : {user.sex}</h6>
                    <h3>Профессия : {user.profession.name}</h3>
                    <h5>
                        <Qualities qualities={user.qualities} />
                    </h5>
                    <h5>Встретился раз : {user.completedMeetings} </h5>
                    <h3>Оценка : {user.rate} </h3>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-warning " onClick={handleClick}>
                        Редактировать
                    </button>
                    <button className="btn btn-primary" onClick={handleReturn}>
                        Все пользователи
                    </button>
                </div>
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
