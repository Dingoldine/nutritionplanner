import { connect } from 'react-redux'
import { compose } from 'recompose'
import Profile from './Profile.js'
import { withAuthorization } from '../../App/session'
import { withFirebase } from '../../App/firebase'

function mapStateToProps(state) {
  return {
    authUser: state.sessionState.authUser
  }
}

const condition = authUser => !!authUser

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
  ),
  withAuthorization(condition)
)(Profile)
