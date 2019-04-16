import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
// import freeze from 'redux-freeze'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { reducers } from './reducers'

/**
 *  This defines base configuration for setting up redux with react.
 *  All the middlewares are defined here and base store is created for provider.
 */

const persistConfig = {
 key: 'root',
 storage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};
const pReducer = persistReducer(persistConfig, reducers);

const middlewares = []

// for promises, since we are using axios for networking
middlewares.push(promise())

// for async operations, network calls
middlewares.push(thunk)

// smart console logging of actions
middlewares.push(logger)

// // add freeze dev middleware
// // this prevents state from being mutated anywhere in the app during dev
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(freeze)
// }

// apply middlewares
const middleware = applyMiddleware(...middlewares)

// create store
export const  store = createStore(pReducer, middleware)
export const persistor = persistStore(store);