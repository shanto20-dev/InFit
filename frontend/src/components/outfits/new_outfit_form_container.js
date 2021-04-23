import { connect } from "react-redux";
import { currentUser } from "../../util/session_api_util";
import { newOutfit } from "../../actions/outfit_actions";
import NewOutfitForm from "./new_outfit_form";
import { getUserClothing } from "../../actions/clothing_actions";
import { clearErrors } from "../../actions/session_actions";

const mapStateToProps = (state) => {
    return {
        currentUser: currentUser,
        errors: state.errors.session,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        newOutfit: (outfitData) => dispatch(newOutfit(outfitData)),
        clearErrors: () => dispatch(clearErrors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOutfitForm);
