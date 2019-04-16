import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './app.css'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import Routes from './routes'
import { persistor, store } from './store';
import { withAuthentication } from './session'

/**
 * Application entry point.
 * Maps provider, store, routes
 *
 */

class App extends Component { // eslint-disable-line

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
