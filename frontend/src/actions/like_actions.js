import * as util from "../util/like_util";

export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const SEND_LIKE = "SEND_LIKE";

const receiveLike = () => {
    return {
        type: RECEIVE_LIKE,
    };
};

const sendLike = () => {
    return {
        type: SEND_LIKE,
    };
};

export const toggleLike = (itemId) => (dispatch) => {
    return util.toggleLike(itemId).then(() => dispatch(sendLike(itemId)));
};
