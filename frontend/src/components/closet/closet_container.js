import { connect } from "react-redux";
import { destroyClothing, getUserClothing } from "../../actions/clothing_actions";
import { destroyOutfit, getUserOutfits } from "../../actions/outfit_actions";
import { currentUser } from "../../util/session_api_util";
import Closet from "./closet";

const mapStateToProps = (state) => {
    
  return {
    currentUser: currentUser,
    errors: state.errors.session,
    clothing: state.entities.clothing.data,
    outfits: state.entities.outfits.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserClothing: (id) => dispatch(getUserClothing(id)),
    getUserOutfits: (id) => dispatch(getUserOutfits(id)),
    deleteOutfit: (id, userId) => {
      return dispatch(destroyOutfit(id, userId))
    },
    deleteClothing: (id, userId) => {
      return dispatch(destroyClothing(id, userId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Closet);
