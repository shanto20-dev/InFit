import {
  RECEIVE_ALL_OUTFITS,
  RECEIVE_USER_OUTFITS,
  RECEIVE_OUTFIT,
  REMOVE_OUTFIT,
} from "../actions/outfit_actions";

const OutfitsReducer = (
  state = {},
  action
) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ALL_OUTFITS:
      return action.outfits;
    case RECEIVE_USER_OUTFITS:
      return action.outfits;
    case RECEIVE_OUTFIT:
      return action.outfit;
    case REMOVE_OUTFIT:
        delete newState[action.outfitId];
        return newState;
    default:
      return state;
  }
};

export default OutfitsReducer;
