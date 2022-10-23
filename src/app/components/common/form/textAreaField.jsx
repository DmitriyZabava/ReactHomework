import React from "react";
import PropTypes from "prop-types";

function TextAreaField({ label, type, name, value, onChange, error }) {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className={getInputClasses()}
                rows="3"
            ></textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
