import { orderBy } from "lodash";
import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import API from "../../api";
import CommentsList from "../common/comments/commentsList";
import CreateComent from "../common/comments/createComent";

const CommentCard = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleSubmit = (data) => {
        API.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const handleRemove = (id) => {
        API.comments.remove(id).then((id) => {
            setComments(comments.filter((coment) => coment._id !== id));
        });
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
