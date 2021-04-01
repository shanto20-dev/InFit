import { combineReducers } from "redux";
import session from "./session_reducer.js";
import errors from "./errors_reducer";
import entities from "./entities_reducer";
import search from "./search_reducer";

const RootReducer = combineReducers({
  session,
  errors,
  entities,
  search,
});

export default RootReducer;
