import { combineReducers } from "redux";

import clothing from "./clothing_reducer";
import users from "./users_reducer"

export default combineReducers({
  users,
  clothing,
});
