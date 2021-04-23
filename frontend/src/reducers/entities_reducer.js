import { combineReducers } from "redux";

import clothing from "./clothing_reducer";
import users from "./users_reducer";
import outfits from "./outfits_reducer";
import likes from "./likes_reducer";

export default combineReducers({
    users,
    clothing,
    outfits,
    likes,
});
