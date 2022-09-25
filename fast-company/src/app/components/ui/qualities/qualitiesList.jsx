import React from "react";
import Quality from "./qualitie";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";
import Loader from "../../common/loader";

const QualitiesList = ({ qualityId }) => {
    const { getQuality, isLoading } = useQualities();
    if (!isLoading) {
        const quality = qualityId.map((id) => getQuality(id));
        return (
            <>
                {quality.map((qual) => (
                    <Quality {...qual} key={qual._id} />
                ))}
            </>
        );
    } else {
        return (
            <p>
                <Loader />
            </p>
        );
    }
};

QualitiesList.propTypes = {
    qualityId: PropTypes.array
};

export default QualitiesList;
