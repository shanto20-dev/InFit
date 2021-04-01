import { connect } from "react-redux";
import SearchResults from "./search_results";

const mapStateToProps = (state) => {
  return {
    searchResults: state.search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
