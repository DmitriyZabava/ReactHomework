import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectFied from "../form/selectField";
import TextAreaField from "../form/textAreaField";

const initialData = {
    userId: "",
    content: ""
};

function Createcontent({ onSubmit }) {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const userList = data.map((user) => ({
                label: user.name,
                value: user._id
            }));
            setUsers(userList);
        });
    }, []);

    const [errors, setErrors] = useState({});
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите пользователя"
            }
        },
        content: {
            isRequired: {
                message: "Комментарий не может быть пустым"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        setData(initialData);
        setErrors({});
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>New comment</h2>
                <SelectFied
                    name="userId"
                    value={data.userId}
                    options={users}
                    onChange={handleChange}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                />
                <TextAreaField
                    label="Сообщение"
                    type="text"
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="btn btn-primary  "
                    >
                        Опубликовать
                    </button>
                </div>
            </form>
        </>
    );
}

Createcontent.propTypes = {
    onSubmit: PropTypes.func
};

export default Createcontent;
