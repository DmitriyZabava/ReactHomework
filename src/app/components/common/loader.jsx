import React from "react";

const Loader = () => {
    return (
        <div className="d-flex align-items-center">
            <strong className="text-primary">Загрузка...</strong>
            <div
                className="spinner-border ml-auto text-primary"
                role="status"
            ></div>
        </div>
    );
};

export default Loader;
