import { connect } from "react-redux";
import { newClothing } from "../../actions/clothing_actions";
import NewClothingForm from "./new_clothing_form";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    newClothing: (clothing) => dispatch(newClothing(clothing)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewClothingForm);
