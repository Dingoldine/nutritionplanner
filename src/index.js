import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { store } from './App/store.js'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Firebase, { FirebaseContext } from './App/firebase'

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
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
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
