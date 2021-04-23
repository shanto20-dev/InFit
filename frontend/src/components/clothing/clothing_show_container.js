import { connect } from "react-redux";
import { getClothing } from "../../actions/clothing_actions";
import { currentUser } from "../../util/session_api_util";
import { searchOutfitByClothing } from "../../actions/search_actions";
import { toggleLike, getUserLikes } from "../../actions/like_actions";
import ClothingShow from "./clothing_show";

const mapStateToProps = (state) => {
    return {
        clothing: state.entities.clothing,
        currentUser: currentUser,
        currentUserId: state.session.user.id,
        likes: state.entities.likes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClothing: (clothingId) => dispatch(getClothing(clothingId)),
        getUserLikes: (id) => dispatch(getUserLikes(id)),
        searchOutfitByClothing: (clothingId) =>
            dispatch(searchOutfitByClothing(clothingId)),
        toggleLike: (itemId, type, user, liked) =>
            dispatch(toggleLike(itemId, type, user, liked)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClothingShow);
