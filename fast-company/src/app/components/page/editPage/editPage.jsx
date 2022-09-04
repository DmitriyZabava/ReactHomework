import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectFied from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import api from "../../../api";
import CheckBoxField from "../../common/form/checkBoxField";
import Loader from "../../common/loader";

const EditPage = ({ user, userId }) => {
    const userQualities = Object.keys(user.qualities).map((optionName) => ({
        label: user.qualities[optionName].name,
        value: user.qualities[optionName]._id,
        color: user.qualities[optionName].color
    }));

    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        profession: user.profession._id,
        sex: user.sex,
        qualities: userQualities,
        confirm: false
    });
    const history = useHistory();

    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    console.log(
        "professions",
        professions.length,
        "qualities",
        qualities.length
    );
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введён некоректно"
            }
        },
        confirm: {
            isRequired: {
                message: "Подтвердите выбранные изменения"
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

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        const updateUser = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        console.log("updateUser", updateUser);
        api.users.update(user._id, updateUser);
        history.replace(`/users/${userId}`);
    };
    return (
        <div className="container mt-5">
            <div className="row ">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {professions.length === 0 || qualities.length === 0 ? (
                        <Loader />
                    ) : (
                        <>
                            <h3 className="mb-4">Редактировать</h3>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Пользователь"
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
                                <SelectFied
                                    label="Выберите вашу профессию"
                                    value={data.profession}
                                    onChange={handleChange}
                                    defaultOption="Choose..."
                                    options={professions}
                                    name="profession"
                                    error={errors.profession}
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
                                    options={qualities}
                                    name="qualities"
                                />
                                <CheckBoxField
                                    value={data.confirm}
                                    onChange={handleChange}
                                    name="confirm"
                                    error={errors.confirm}
                                >
                                    Подтвердить
                                </CheckBoxField>

                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

EditPage.propTypes = {
    user: PropTypes.object,
    userId: PropTypes.string
};

export default EditPage;
