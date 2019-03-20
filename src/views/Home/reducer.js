import {REQUEST_FOOD, RECEIVE_FOOD } from './actions';

const INITIAL_STATE = {}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_FOOD:
       return { ...state, loading: true };
    case RECEIVE_FOOD:
       return { ...state, json: action.json, loading: false };
    default:
       return state;
  }
};
export default reducer;