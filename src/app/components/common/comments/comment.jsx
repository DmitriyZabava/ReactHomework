import React from "react";
import PropTypes from "prop-types";
import Loader from "../loader";
import { formatDate } from "../../../utils/formatDate";
import { useUser } from "../../../hooks/useUser";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({ content, userId, created_at: created, onRemove, _id }) => {
    const { getUser } = useUser();
    const { currentUser } = useAuth();
    const user = getUser(userId);

    if (user) {
        return (
            <div className="bg-light card-body mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start">
                            <img
                                src={user.image}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1">
                                            {`${user.name} `}
                                            <span className="small">
                                                {formatDate(created)}
                                            </span>
                                        </p>
                                        {currentUser._id === userId && (
                                            <button
                                                onClick={() => onRemove(_id)}
                                                className="btn btn-sm  text-primary d-flex  align-items-center"
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        )}
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader />;
    }
};

Comment.propTypes = {
    content: PropTypes.string,
    userId: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onRemove: PropTypes.func,
    _id: PropTypes.string
};

export default Comment;
