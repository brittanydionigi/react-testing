import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import userActions from '../actions/userActions';
import Login from '../components/Login';

function mapStateToProps(state) {
  // Only return the state you need to pass down, rather than the entire state
  // object. If you pass in the entire state object, the component will continue 
  // to unecessarily re-render whenever any portion of the state is updated.
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
