import { connect } from "react-redux";
import { getClothing } from "../../actions/clothing_actions";
import { currentUser } from "../../util/session_api_util";
import ClothingShow from "./clothing_show";

const mapStateToProps = (state) => {
  return {
    clothing: state.entities.clothing,
    currentUser: currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClothing: (clothingId) => dispatch(getClothing(clothingId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClothingShow);
