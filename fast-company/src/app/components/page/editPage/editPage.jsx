import React, { useState, useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectFied from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import api from "../../../api";
import CheckBoxField from "../../common/form/checkBoxField";
import Loader from "../../common/loader";
import BackHistoryButton from "../../common/backHistoryButton";

const EditPage = () => {
    const { userId } = useParams();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: [],
        confirm: false
    });
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
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
    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };
    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }))
        );
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
    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

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
        api.users
            .update(userId, updateUser)
            .then((data) => history.replace(`/users/${data._id}`));
    };

    return (
        <>
            <div className="container mt-5">
                <BackHistoryButton />
                <div className="row ">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {!isLoading && Object.keys(professions).length > 0 ? (
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
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditPage;
