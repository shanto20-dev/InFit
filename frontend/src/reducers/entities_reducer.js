import { combineReducers } from "redux";

import clothing from "./clothing_reducer";
import outfits from "./outfits_reducer"

export default combineReducers({
  clothing,
  outfits,
});
