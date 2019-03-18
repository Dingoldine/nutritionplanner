import { connect } from 'react-redux';
import { compose } from 'recompose';
import Home from './Home';
import { withAuthorization } from '../../app/session'
import { withFirebase } from '../../app/firebase'

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