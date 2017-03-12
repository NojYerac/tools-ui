"use strict";
import {LOG_DRAWER_TOGGLE, SET_LOG_LEVEL, LOG_DRAWER_OPEN} from "actions/types";
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
let initialState = {open: false, logLevel: 4};

const actions = {
  [LOG_DRAWER_TOGGLE]: (state) => {
    let nextState = Object.assign({}, state);
    nextState.open = !state.open;
    return nextState;
  },

  [LOG_DRAWER_OPEN]: (state) => {
    let nextState = Object.assign({}, state);
    nextState.open = true;
    return nextState;
  },

  [SET_LOG_LEVEL]: (state, action) => {
    let nextState = Object.assign({}, state);
    nextState.logLevel = action.level;
    return nextState;
  }
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  if (actions.hasOwnProperty(action.type)) {
    return actions[action.type](state, action);
  }
  return state;
};
