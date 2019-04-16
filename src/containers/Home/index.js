import { compose } from 'recompose'
import Home from './Home'
import { withAuthorization } from '../../App/session'
import { withFirebase } from '../../App/firebase'

const condition = authUser => !!authUser

export default compose(
  withFirebase,
  withAuthorization(condition)
)(Home)
