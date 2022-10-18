import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectFied from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import CheckBoxField from "../../common/form/checkBoxField";
import Loader from "../../common/loader";
import BackHistoryButton from "../../common/backHistoryButton";
import { useQualities } from "../../../hooks/useQualities";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const EditPage = () => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(true);
    const { currentUser, updateUserData } = useAuth();
    const {
        getQualitiesByIds,
        qualities,
        isLoading: qualityLoading
    } = useQualities();
    const qualitiesList = convertValue(qualities);
    const { professions, isLoading: professionLoading } = useProfession();
    const professionList = convertValue(professions);
    const userQualities = getQualitiesByIds(currentUser.qualities);

    const [data, setData] = useState();

    function convertValue(value) {
        if (value) {
            const array = Array.isArray(value) ? value : Object.values(value);
            return array.map((item) => {
                const { name: label, _id: value, ...rest } = item;
                return { label, value, ...rest };
            });
        }
    }
    useEffect(() => {
        if (
            !qualityLoading &&
            !professionLoading &&
            currentUser &&
            !data &&
            userQualities
        ) {
            setData({
                ...currentUser,
                qualities: convertValue(userQualities),
                confirm: false
            });
        }
    }, [qualityLoading, professionLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) setLoading(false);
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

    function convertQulities(qual) {
        return qual.map((q) => q.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;
        const newData = { ...data, qualities: convertQulities(data.qualities) };
        try {
            await updateUserData({ ...newData, confirm: false });
            history.replace(`/users/${newData._id}`);
        } catch (error) {
            setErrors(error);
        }
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
                                        options={professionList}
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
                                        options={qualitiesList}
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
