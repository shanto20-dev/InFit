import { connect } from 'react-redux';
import { getOutfit } from '../../actions/outfit_actions';
import OutfitShow from './outfit_show';

const mapStateToProps = (state) => {
    return{
        outfit: state.entities.outfits,
}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOutfit: (id) => dispatch(getOutfit(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutfitShow)