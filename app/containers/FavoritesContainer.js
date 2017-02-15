import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import favoriteActions from '../actions/favoriteActions';
import { Favorites } from '../components/Favorites';

function mapStateToProps(state) {
  return { favorites: state.favorites };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(favoriteActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
