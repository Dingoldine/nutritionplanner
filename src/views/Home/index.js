import { connect } from 'react-redux';
import { compose } from 'recompose';
import Home from './Home';
import { withAuthorization } from '../../app/session'
import { withFirebase } from '../../app/firebase'
import { RECEIVE_FOOD, REQUEST_FOOD } from'./actions'

function mapStateToProps(state) {
  return {
    authUser: state.sessionState.authUser,
  }
}

const mapDispatchToProps = dispatch => ({
  
});

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withAuthorization(condition),
)(Home);