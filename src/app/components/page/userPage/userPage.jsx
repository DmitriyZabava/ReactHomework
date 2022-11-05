import React from "react";
import PropTypes from "prop-types";
import Loader from "../../common/loader";
import UserCard from "../../ui/userCard";
import MeetigsCard from "../../ui/meetingsCard";
import CommentCard from "../../ui/commentCard";
import QualitiesCard from "../../ui/qualitiesCard";

import CommentsProvider from "../../../hooks/useComments";
import { getUserById } from "../../../store/users";
import { useSelector } from "react-redux";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));

    if (user) {
        return (
            <div className="container mt-4">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard qualityIds={user.qualities} />
                        <MeetigsCard value={user.completedMeetings} />
                    </div>

                    <div className="col-md-8">
                        <CommentsProvider>
                            <CommentCard />
                        </CommentsProvider>
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
