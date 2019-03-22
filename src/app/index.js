import React, { Component } from 'react'
// import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
// import { store } from './store.js'
import './app.css'
import Routes from './routes'
// import Firebase, { FirebaseContext, withFirebase } from './firebase'
import { withAuthentication } from './session'

/**
 * Application entry point.
 * Maps provider, store, routes
 *
 * We are using browser router, if hashRouting is preferred then this is where you change.
 */
class App extends Component {
  // eslint-disable-line

  render() {
    return (
      <Router>
        <Routes />
      </Router>
    )
  }
}

export default withAuthentication(App)
