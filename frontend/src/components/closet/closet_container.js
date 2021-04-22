import { connect } from "react-redux";
import {
    destroyClothing,
    getUserClothing,
} from "../../actions/clothing_actions";
import { getUserLikes, toggleLike } from "../../actions/like_actions";
import { destroyOutfit, getUserOutfits } from "../../actions/outfit_actions";
import { currentUser } from "../../util/session_api_util";
import Closet from "./closet";

const mapStateToProps = (state) => {
    return {
        currentUser: currentUser,
        errors: state.errors.session,
        clothing: state.entities.clothing.data,
        outfits: state.entities.outfits.data,
        likes: state.entities.likes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserClothing: (id) => dispatch(getUserClothing(id)),
        getUserOutfits: (id) => dispatch(getUserOutfits(id)),
        getUserLikes: (id) => dispatch(getUserLikes(id)),
        toggleLike: (id, user, type, liked) =>
            dispatch(toggleLike(id, user, type, liked)),
        deleteOutfit: (id, userId) => {
            return dispatch(destroyOutfit(id, userId));
        },
        deleteClothing: (id, userId) => {
            return dispatch(destroyClothing(id, userId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Closet);
