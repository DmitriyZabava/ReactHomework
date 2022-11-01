import React, { useEffect } from "react";
import Quality from "./quality";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualityIds }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) return "Loading...";
    const qualitiesList = useSelector(getQualitiesByIds(qualityIds));

    return (
        <>
            {qualitiesList.map((qual) => (
                <Quality {...qual} key={qual._id} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualityIds: PropTypes.array
};

export default QualitiesList;
