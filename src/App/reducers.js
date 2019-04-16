import { combineReducers } from 'redux'

import { AUTH_USER } from './constants'

const initialState = {
  authUser: null
}

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authUser: action.payload
      }
    default:
      return state
  }
}

/**
 * Defines mapping of individual view reducers to global state object.
 *
 * Every time a new view is created, entry for that view's reducer is required here.
 *
 * @type {Reducer<any>}
 */
export const reducers = combineReducers({
  sessionState: sessionReducer
})
