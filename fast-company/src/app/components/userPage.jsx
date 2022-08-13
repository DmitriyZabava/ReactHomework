import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../api";
import Loader from "./loader";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [selectetUser, setSelectetUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setSelectetUser(data));
    }, []);

    const handleSave = () => history.replace("/users");

    if (selectetUser) {
        return (
            <>
                <h1>{selectetUser.name}</h1>
                <h3>Профессия : {selectetUser.profession.name}</h3>
                <QualitiesList qualities={selectetUser.qualities} />
                <h5>Встретился раз : {selectetUser.completedMeetings} </h5>
                <h3>Оценка : {selectetUser.rate} </h3>
                <button
                    className="btn btn-warning"
                    onClick={() => handleSave()}
                >
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
