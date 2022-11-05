import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";

import SelectFied from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        name: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });

    const [errors, setErrors] = useState({});

    function convertValue(value) {
        return value.map((v) => ({ label: v.name, value: v._id }));
    }

    const qualities = useSelector(getQualities());
    const qualitiesList = convertValue(qualities);
    const professions = useSelector(getProfessions());
    const professionList = convertValue(professions);

    const handleChange = (target) => {
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
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно содержать минимум 3 символа",
                value: 3
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
                message: "Обязательно выберите профессию"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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

    function convertQulities(qual) {
        return qual.map((q) => q.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValide = validate();

        if (!isValide) return;
        const newData = { ...data, qualities: convertQulities(data.qualities) };
        dispatch(signUp(newData));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Имя"
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
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
                    label="Выберите вашу профессию"
                    value={data.profession}
                    onChange={handleChange}
                    defaultOption="Choose..."
                    options={professionList}
                    error={errors.profession}
                    name="profession"
                />
                <RadioField
                    options={[
                        { name: "Male", value: "male" },
                        { name: "Female", value: "female" },
                        { name: "Other", value: "other" }
                    ]}
                    value={data.sex}
                    name="sex"
                    onChange={handleChange}
                    label="Выберите пол"
                />
                <MultiSelectField
                    label="Выберите качества"
                    onChange={handleChange}
                    defaultValue={data.qualities}
                    options={qualitiesList}
                    name="qualities"
                />
                <CheckBoxField
                    value={data.licence}
                    onChange={handleChange}
                    name="licence"
                    error={errors.licence}
                >
                    Подтвердить <a>лицензионное соглашение</a>
                </CheckBoxField>

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
