import { connect } from "react-redux";
import { getClothing } from "../../actions/clothing_actions";
import { currentUser } from "../../util/session_api_util";
import { searchOutfitByClothing } from "../../actions/search_actions";
import ClothingShow from "./clothing_show";

const mapStateToProps = (state) => {
    return {
        clothing: state.entities.clothing,
        currentUser: currentUser,
        currentUserId: state.session.user.id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClothing: (clothingId) => dispatch(getClothing(clothingId)),
        searchOutfitByClothing: (clothingId) =>
            dispatch(searchOutfitByClothing(clothingId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClothingShow);
