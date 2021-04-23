import { connect } from "react-redux";
import { getOutfit, updateOutfit } from "../../actions/outfit_actions";
import { getClothing, getUserClothing } from "../../actions/clothing_actions";
import { currentUser } from "../../util/session_api_util";
import { toggleLike, getUserLikes } from "../../actions/like_actions";
import OutfitShow from "./outfit_show";

const mapStateToProps = (state) => {
    return {
        currentUser: currentUser,
        outfit: state.entities.outfits,
        clothes: state.entities.clothing,
        cloth: state.entities.clothing,
        likes: state.entities.likes,
        currentUserId: state.session.user.id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOutfit: (id) => dispatch(getOutfit(id)),
        getClothing: (clothingId) => dispatch(getClothing(clothingId)),
        getUserClothing: (id) => dispatch(getUserClothing(id)),
        getUserLikes: (id) => dispatch(getUserLikes(id)),
        updateOutfit: (outfitData) => dispatch(updateOutfit(outfitData)),
        toggleLike: (itemId, type, user, liked) =>
            dispatch(toggleLike(itemId, type, user, liked)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutfitShow);
