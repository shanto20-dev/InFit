import { connect } from "react-redux";
import { newClothing } from "../../actions/clothing_actions";
import { clearErrors } from "../../actions/session_actions";
import NewClothingForm from "./new_clothing_form";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newClothing: (clothing) => dispatch(newClothing(clothing)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewClothingForm);
