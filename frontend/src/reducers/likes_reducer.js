import { RECEIVE_LIKES, SEND_LIKE } from "../actions/like_actions";

const LikesReducer = (state = [], action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_LIKES:
            return action.likes.data;
        default:
            return state;
    }
};

export default LikesReducer;
