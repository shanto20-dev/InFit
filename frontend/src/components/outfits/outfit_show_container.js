import { connect } from "react-redux";
import { getOutfit, updateOutfit } from "../../actions/outfit_actions";
import { getClothing, getUserClothing } from "../../actions/clothing_actions";
import { currentUser } from "../../util/session_api_util";
import OutfitShow from "./outfit_show";

const mapStateToProps = (state) => {
  return {
    currentUser: currentUser,
    outfit: state.entities.outfits,
    clothes: state.entities.clothing.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOutfit: (id) => dispatch(getOutfit(id)),
    getClothing: (clothingId) => dispatch(getClothing(clothingId)),
    getUserClothing: (id) => dispatch(getUserClothing(id)),
    updateOutfit: (outfitData) => dispatch(updateOutfit(outfitData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutfitShow);
