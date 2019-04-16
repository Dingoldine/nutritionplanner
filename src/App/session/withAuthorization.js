import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { withFirebase } from '../firebase'

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      const { firebase, history } = this.props
      this.listener = firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          history.push('/')
        }
      })
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      const { authUser } = this.props
      return condition(authUser) ? <Component {...this.props} /> : null
    }
  }

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser
  })

  return compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps)
  )(WithAuthorization)
}

export default withAuthorization
