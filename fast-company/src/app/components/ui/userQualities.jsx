import React from "react";
import Qualities from "./qualities";
import PropTypes from "prop-types";

const UserQualities = ({ qualities }) => {
    return (
        <div className="mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text">
                    <Qualities qualities={qualities} />
                </p>
            </div>
        </div>
    );
};

UserQualities.propTypes = {
    qualities: PropTypes.array
};

export default UserQualities;
