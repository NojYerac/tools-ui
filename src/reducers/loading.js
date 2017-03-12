"use strict";
import {START_LOADING, STOP_LOADING} from "actions/types";
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
let initialState = {loading: 0};

const actions = {};
actions[START_LOADING] = (state) => {
  let nextState = Object.assign({}, state);
  nextState.loading++;
  return nextState;
};

actions[STOP_LOADING] = state => {
  let nextState = Object.assign({}, state);
  nextState.loading--;
  return nextState;
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  if (actions.hasOwnProperty(action.type)) {
    return actions[action.type](state, action);
  }
  return state;
};
