import { connect } from "react-redux";
import { getOutfit } from "../../actions/outfit_actions";
import { getClothing } from "../../actions/clothing_actions";
import OutfitShow from "./outfit_show";

const mapStateToProps = (state) => {
  return {
    outfit: state.entities.outfits,
    clothes: state.entities.clothing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOutfit: (id) => dispatch(getOutfit(id)),
    getClothing: (clothingId) => dispatch(getClothing(clothingId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutfitShow);
