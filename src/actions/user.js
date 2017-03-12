"use strict";
import {user} from "sources";
import {REQUEST_USER, USER_DRAWER_TOGGLE, LOGIN_USER, LOGOUT_USER} from "./types";

export const requestUser = () => dispatch => {
  dispatch({
    type: REQUEST_USER,
    payload: user.fetchUser(dispatch)
  });
};

export const loginUser = login => dispatch => {
  dispatch({
    type: LOGIN_USER,
    payload: user.loginUser(login, dispatch)
  });
};

export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT_USER,
    payload: user.logoutUser(dispatch)
  });
};

export const userDrawerToggle = () => dispatch => {
  dispatch({
    type: USER_DRAWER_TOGGLE
  });
};
