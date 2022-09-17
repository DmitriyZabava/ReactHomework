import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import api from "../../../api";
import Loader from "../../common/loader";
import UserCard from "../../ui/userCard";
import UserQualities from "../../ui/userQualities";
import MeetigsCard from "../../ui/meetingsCard";
import CommentCard from "../../ui/commentCard";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <div className="container mt-4">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <UserQualities qualities={user.qualities} />
                        <MeetigsCard value={user.completedMeetings} />
                    </div>

                    <div className="col-md-8">
                        <CommentCard />
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader />;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
