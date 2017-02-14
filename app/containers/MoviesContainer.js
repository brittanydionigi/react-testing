import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import movieActions from '../actions/movieActions';
import MovieList from '../components/MovieList';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(movieActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
