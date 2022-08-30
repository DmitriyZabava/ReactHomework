import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectFied from "../common/form/selectField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: ""
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введён некоректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пародь должен содержать заглавную букву"
            },
            isContainDigit: {
                message: "Пародь должен содержать цифру"
            },
            min: {
                message: "Пароль должен содержать минимум 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
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

    const isValide = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValide = validate();
        if (!isValide) return;
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Электронная Почта"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <SelectFied
                    label="Вsберите вашу профессию"
                    value={data.profession}
                    onChange={handleChange}
                    defaultOption="Choose..."
                    options={professions}
                    error={errors.profession}
                />
                <button
                    type="submit"
                    disabled={!isValide}
                    className="btn btn-primary w-100 mx-auto"
                >
                    Отправить
                </button>
            </form>
        </>
    );
};

export default RegisterForm;
