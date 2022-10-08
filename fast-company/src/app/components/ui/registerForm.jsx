import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";

import SelectFied from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQualities";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });

    const { siginUp } = useAuth();

    const [errors, setErrors] = useState({});

    function convertValue(value) {
        return value.map((v) => ({ label: v.name, value: v._id }));
    }
    const { qualities } = useQualities();
    const qualitiesList = convertValue(qualities);
    const { professions } = useProfession();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValide = validate();

        if (!isValide) return;
        const newData = { ...data, qualities: convertQulities(data.qualities) };

        try {
            await siginUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
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
