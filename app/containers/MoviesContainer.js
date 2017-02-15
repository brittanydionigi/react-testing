import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import movieActions from '../actions/movieActions';
import userActions from '../actions/userActions';
import favoriteActions from '../actions/favoriteActions';
import MovieList from '../components/MovieList';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    ...movieActions,
    signOut: userActions.signOut,
    addFavorite: favoriteActions.addFavorite
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
