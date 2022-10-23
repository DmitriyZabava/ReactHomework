import httpServices from "./http.service";

const commentEndPoint = "comment/";

const commentService = {
    getComment: async (pageId) => {
        const { data } = await httpServices.get(commentEndPoint, {
            params: {
                orderBy: `"pageId"`,
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    removeComment: async (commentId) => {
        const { data } = await httpServices.delete(commentEndPoint + commentId);
        return data;
    },
    createComment: async (payload) => {
        const { data } = await httpServices.put(
            commentEndPoint + payload._id,
            payload
        );
        return data;
    }
};

export default commentService;
