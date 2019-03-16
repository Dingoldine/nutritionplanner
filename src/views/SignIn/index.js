import { connect } from 'react-redux'
import { compose } from 'redux'
import SignIn from './SignIn'
import { withFirebase } from '../../app/firebase'

function mapStateToProps(state) {
  // return {
  //   test: state.home.test,
  //   testData: state.home.testData
  // }
}

const withConnect = connect(mapStateToProps);

export default compose(withConnect, withFirebase)(SignIn)
