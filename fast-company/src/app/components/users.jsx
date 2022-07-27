import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
    const pageSize = 2;
    const [professions, setProfessions] = useState();
    const [selectetProf, setSelectetProf] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectetProf]);

    const handlePrfessionSelect = (item) => {
        console.log("handlitem", item);
        setSelectetProf(item);
        console.log("selectetProf", selectetProf);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const clearFilter = () => {
        setSelectetProf();
    };

    const filteredUsers = selectetProf
        ? allUsers.filter((user) => user.profession._id === selectetProf)
        : allUsers;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectetItem={selectetProf}
                        items={professions}
                        onItemSelect={handlePrfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr className="table-secondary">
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился.раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user, indx) => (
                                <User
                                    key={user._id}
                                    {...rest}
                                    {...user}
                                    indx={indx}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
