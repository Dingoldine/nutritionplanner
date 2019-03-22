import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import SignUp from './SignUp'
import { withFirebase } from '../../app/firebase'

const mapStateToProps = state => {
  return {
    // test: state.SignUp.test,
    // testData: state.SignUp.testData
  }
}

const withConnect = connect(mapStateToProps)

export default compose(
  withConnect,
  withFirebase,
  withRouter
)(SignUp)
