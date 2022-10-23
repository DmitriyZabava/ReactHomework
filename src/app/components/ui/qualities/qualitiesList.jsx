import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualityIds }) => {
    const { isLoading } = useQualities();

    if (isLoading) return "Loading...";
    return (
        <>
            {qualityIds.map((qual) => (
                <Quality id={qual} key={qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualityIds: PropTypes.array
};

export default QualitiesList;
