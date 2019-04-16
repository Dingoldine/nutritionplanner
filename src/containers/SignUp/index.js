import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import SignUp from './SignUp'
import { withFirebase } from '../../App/firebase'

export default compose(
  withFirebase,
  withRouter
)(SignUp)
