import React from "react";
import { useProfession } from "../../hooks/useProfession";
import Loader from "../common/loader";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfession();
    const profesion = getProfession(id);
    if (!isLoading) {
        return <p>{profesion.name}</p>;
    } else {
        return (
            <p>
                <Loader />
            </p>
        );
    }
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
