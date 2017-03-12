"use strict";
import {USER_DRAWER_TOGGLE} from "actions/types";
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
let initialState = {open: false};

const actions = {};
actions[USER_DRAWER_TOGGLE] = (state, action) => {
  let nextState = Object.assign({}, state);
  nextState.open = action.open === undefined ? !state.open : action.open;
  return nextState;
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  if (actions.hasOwnProperty(action.type)) {
    return actions[action.type](state, action);
  }
  return state;
};
