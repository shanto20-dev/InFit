import * as util from "../util/like_util";

export const RECEIVE_LIKES = "RECEIVE_LIKES";
export const SEND_LIKE = "SEND_LIKE";

const receiveLikes = (likes) => {
    return {
        type: RECEIVE_LIKES,
        likes,
    };
};

const sendLike = () => {
    return {
        type: SEND_LIKE,
    };
};

export const toggleLike = (itemId, type, user, liked) => (dispatch) => {
    return util
        .toggleLike(itemId, type, user, liked)
        .then(() => dispatch(sendLike(itemId)));
};

export const getUserLikes = (id) => (dispatch) => {
    return util.fetchLikes(id).then((likes) => dispatch(receiveLikes(likes)));
};
