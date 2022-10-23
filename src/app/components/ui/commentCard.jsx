import React from "react";
import { orderBy } from "lodash";
import { useComments } from "../../hooks/useComments";
import CommentsList from "../common/comments/commentsList";
import CreateComent from "../common/comments/createComent";

const CommentCard = () => {
    const { createComent, comments, removeComment } = useComments();

    const handleSubmit = (data) => {
        createComent(data);
    };

    const handleRemove = (id) => {
        removeComment(id);
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

                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemove}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default CommentCard;
