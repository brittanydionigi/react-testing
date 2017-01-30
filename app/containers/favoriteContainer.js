import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/index.js';
import { FavoriteMovies } from '../components/favoriteMovies.jsx';

function mapStateToProps(state) {
  return { favorites: state.favoriteReducer};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteMovies);
