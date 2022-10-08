import React from "react";
import useMockData from "../utils/mockData";

const Home = () => {
    const { error, initialize, progress, status } = useMockData();

    const handleClick = () => {
        initialize();
    };

    return (
        <div className="container mt-5">
            <h1>HOME PAGE</h1>
            <h3>Initial Data in FireBase</h3>
            <ul>
                <li>Status : {status}</li>
                <li>Progress : {progress} %</li>
                {error && <li>Error : {error} </li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Initial
            </button>
        </div>
    );
};

export default Home;
