import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import Loader from "../../common/loader";
import TextField from "../../common/form/textField";
import { useUser } from "../../../hooks/useUser";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const professions = useSelector(getProfessions());
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 4;
    const [searchQuery, setSearchQuery] = useState("");
    const { currentUser } = useAuth();
    const { users } = useUser();

    const handleTogleBookMark = (userId) => {
        const userIndex = users.findIndex((user) => user._id === userId);
        const newUsers = [...users];
        newUsers[userIndex].bookmark = !newUsers[userIndex].bookmark;
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handelSearchQuery = (target) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        function filterUser(data) {
            const filteredUsers = searchQuery
                ? data.filter(
                      (user) =>
                          user.name
                              .toLowerCase()
                              .indexOf(searchQuery.toLowerCase()) !== -1
                  )
                : selectedProf
                ? data.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf._id)
                  )
                : data;
            return filteredUsers.filter((user) => user._id !== currentUser._id);
        }
        const filteredUsers = filterUser(users);
        const count = filteredUsers.length;

        const sortetUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const usersCrop = paginate(sortetUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
            if (searchQuery !== "") setSearchQuery("");
        };

        return (
            <div className="d-flex">
                {professions && !professionLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <TextField
                        id="search"
                        name="search"
                        value={searchQuery}
                        placeholder="Search..."
                        onChange={handelSearchQuery}
                    />
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onToggleBookMark={handleTogleBookMark}
                        />
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
    }
    return <Loader />;
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
