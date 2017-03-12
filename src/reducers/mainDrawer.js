"use strict";
import {MAIN_DRAWER_TOGGLE} from "actions/types";
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
let initialState = {open: false, menuItems: []};

const actions = {};
actions[MAIN_DRAWER_TOGGLE] = (state) => {
  let nextState = Object.assign({}, state);
  nextState.open = !state.open;
  return nextState;
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  if (actions.hasOwnProperty(action.type)) {
    return actions[action.type](state, action);
  }
  return state;
};
