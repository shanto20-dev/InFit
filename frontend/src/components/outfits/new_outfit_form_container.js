import { connect } from 'react-redux';
import { currentUser } from '../../util/session_api_util';
import { newOutfit } from '../../actions/outfit_actions';
import NewOutfitForm from './new_outfit_form';


const mapStateToProps = (state) => {
    return {
        currentUser: currentUser,
        errors: state.errors.session,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOutfit: (outfitData) => dispatch(newOutfit(outfitData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOutfitForm)