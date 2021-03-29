import {
  RECEIVE_ALL_CLOTHING,
  RECEIVE_USER_CLOTHING,
  RECEIVE_CLOTHING,
  REMOVE_CLOTHING,
} from "../actions/clothing_actions";

const ClothingReducer = (
  state = {},
  action
) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ALL_CLOTHING:
      return action.clothings;
    case RECEIVE_USER_CLOTHING:
      return action.clothings;
    case RECEIVE_CLOTHING:
      return action.clothing;
    case REMOVE_CLOTHING:
        delete newState[action.clothingId];
        return newState;
    default:
      return state;
  }
};

export default ClothingReducer;
