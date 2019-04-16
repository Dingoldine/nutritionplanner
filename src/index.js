import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './App/store.js'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Firebase, { FirebaseContext } from './App/firebase'

/**
 * Entry point into the application.
 *
 * Note: registerServiceWorker is optional,
 * if you don't want to use it, just comment
 * registerServiceWorker();
 */
// ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
