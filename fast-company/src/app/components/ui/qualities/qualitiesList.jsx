import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualityIds }) => {
    const { getQuality } = useQualities();

    const quality = qualityIds.map((id) => getQuality(id));

    return (
        <>
            {quality.map((qual) => (
                <Quality {...qual} key={qual._id} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualityIds: PropTypes.array
};

export default QualitiesList;
