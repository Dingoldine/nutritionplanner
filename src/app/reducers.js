import { combineReducers } from 'redux'
import SignInReducer from '../views/SignIn/reducer'
import SignUpReducer from '../views/SignUp/reducer'
import HomeReducer from '../views/Home/reducer'

/**
 * Defines mapping of individual view reducers to global state object.
 *
 * Every time a new view is created, entry for that view's reducer is required here.
 *
 * @type {Reducer<any>}
 */
export const reducers = combineReducers({
  SignIn: SignInReducer
})
