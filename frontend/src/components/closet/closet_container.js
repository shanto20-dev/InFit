import { connect } from "react-redux";
import { destroyClothing, getUserClothing } from "../../actions/clothing_actions";
import { currentUser } from "../../util/session_api_util";
import Closet from "./closet";

const mapStateToProps = (state) => {
    
  return {
    currentUser: currentUser,
    errors: state.errors.session,
    clothing: state.entities.clothing.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserClothing: (id) => dispatch(getUserClothing(id)),
    deleteClothing: (id, userId) => {
      return dispatch(destroyClothing(id, userId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Closet);
