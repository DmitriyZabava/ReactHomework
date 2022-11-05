import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commetCreateRequsted: (state) => {
            state.isLoading = true;
        },
        comentCreated: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        commentCreateFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        commentRemoveRequested: (state) => {
            state.isLoading = true;
        },
        commentRemoved: (state, action) => {
            console.log("APaylod", action.payload);
            state.entities = state.entities.filter(
                (comm) => comm._id !== action.payload
            );
            state.isLoading = false;
        },
        commentRemoveFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFailed,
    commetCreateRequsted,
    comentCreated,
    commentCreateFailed,
    commentRemoveRequested,
    commentRemoved,
    commentRemoveFailed
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());

    try {
        const { content } = await commentService.getComment(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.massege));
    }
};
export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export const createComment =
    (payload, userId, currentUserId) => async (dispatch) => {
        dispatch(commetCreateRequsted());
        const comment = {
            ...payload,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(comentCreated(content));
        } catch (error) {
            dispatch(commentCreateFailed(error.massege));
        }
    };
export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commentRemoveRequested());
    try {
        const { content } = await commentService.removeComment(commentId);
        if (content === null) {
            dispatch(commentRemoved(commentId));
        }
    } catch (error) {
        dispatch(commentRemoveFailed(error.massege));
    }
};

export default commentsReducer;
