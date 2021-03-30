import { connect } from "react-redux";
import { getUserClothing } from "../../actions/clothing_actions";
import { currentUser } from "../../util/session_api_util";
import Closet from "./closet";

const mapStateToProps = (state) => {
  return {
    currentUser: currentUser,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserClothes: (id) => dispatch(getUserClothing(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Closet);
