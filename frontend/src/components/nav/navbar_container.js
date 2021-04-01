import { connect } from "react-redux";
import { searchClothesByName } from "../../actions/search_actions";
import { logout } from "../../actions/session_actions";

import NavBar from "./navbar";

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    searchClothesByName: (searchTerm) =>
      dispatch(searchClothesByName(searchTerm)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
