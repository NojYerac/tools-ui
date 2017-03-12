"use strict";
import {REQUEST_USER, LOGIN_USER, LOGOUT_USER} from "actions/types";
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {};

const actions = {
  [`${REQUEST_USER}_PENDING`]: state => state,
  [`${REQUEST_USER}_FULFILLED`]: (state, action) => action.payload,
  [`${REQUEST_USER}_REJECTED`]: () => ({}),

  [`${LOGIN_USER}_PENDING`]: state => state,
  [`${LOGIN_USER}_FULFILLED`]: state => state,
  [`${LOGIN_USER}_REJECTED`]: state => state,

  [`${LOGOUT_USER}_PENDING`]: state => state,
  [`${LOGOUT_USER}_FULFILLED`]: state => state,
  [`${LOGOUT_USER}_REJECTED`]: state => state
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  if (actions.hasOwnProperty(action.type)) {
    return actions[action.type](state, action);
  }
  return state;
};
