import { connect } from "react-redux";
import { editClothing, getClothing } from "../../actions/clothing_actions";
import EditClothingForm from "./edit_clothing_form";

const mapStateToProps = (state) => {
  console.log(state.entities.clothing)
  return {
    clothing: state.entities.clothing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editClothing: (clothing) => dispatch(editClothing(clothing)),
    getClothing: (clothing) => dispatch(getClothing(clothing)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditClothingForm);
