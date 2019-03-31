import React, { Component } from 'react'
// import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
// import { store } from './store.js'
import './app.css'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import Routes from './routes'
import { persistor, store } from './store';

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
      <Provider store={store}>
        <PersistGate loading={<div>hej</div>} persistor={persistor}>
          <Router>
            <Routes />
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default withAuthentication(App)
