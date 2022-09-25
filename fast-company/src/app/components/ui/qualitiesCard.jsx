import React from "react";
import Qualities from "./qualities";
import PropTypes from "prop-types";

const QualitiesCard = ({ qualityIds }) => {
    return (
        <div className="mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text">
                    <Qualities qualityIds={qualityIds} />
                </p>
            </div>
        </div>
    );
};

QualitiesCard.propTypes = {
    qualityIds: PropTypes.array
};

export default QualitiesCard;
