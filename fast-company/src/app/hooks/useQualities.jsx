import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setErrors] = useState(null);

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fethAll();
                setQualities(content);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getQualities();
    }, []);

    const getQuality = (id) => qualities.find((qual) => qual._id === id);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setErrors(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast.warning(error);
            setErrors(null);
        }
    }, [error]);

    return (
        <QualitiesContext.Provider
            value={{
                qualities,
                getQuality
            }}
        >
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
