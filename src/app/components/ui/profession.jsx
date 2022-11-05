import React from "react";

import Loader from "../common/loader";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const profesion = useSelector(getProfessionById(id));
    if (!isLoading) {
        return <p>{profesion.name}</p>;
    } else {
        return (
            <h6>
                <Loader />
            </h6>
        );
    }
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
