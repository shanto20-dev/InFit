import { RECEIVE_SEARCHED_CLOTHING } from "../actions/search_actions";

const SearchReducer = (state = [], action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SEARCHED_CLOTHING:
      return action.clothing;
    default:
      return state;
  }
};

export default SearchReducer;
