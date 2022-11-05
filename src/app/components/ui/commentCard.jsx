import React, { useEffect } from "react";
import { orderBy } from "lodash";
import CommentsList from "../common/comments/commentsList";
import CreateComent from "../common/comments/createComent";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comment";
import Loader from "../common/loader";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";

const CommentCard = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const handleSubmit = (data) => {
        dispatch(createComment(data, userId, currentUserId));
    };

    const handleRemove = (id) => {
        dispatch(removeComment(id));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <CreateComent onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />

                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemove}
                            />
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default CommentCard;
