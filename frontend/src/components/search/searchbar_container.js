import { connect } from "react-redux";
import Searchbar from "./searchbar";
import { searchClothesByName } from "../../actions/search_actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchClothesByName: (searchTerm) =>
      dispatch(searchClothesByName(searchTerm)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Searchbar)
);
