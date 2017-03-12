"use strict";
import fetch from "isomorphic-fetch";
import * as log from "actions/log";
import {REQUEST_USER, USER_DRAWER_TOGGLE} from "actions/types";
import {startLoading, stopLoading} from "actions/loading"
import config from "config";
const endpoint = config.AUTH_ROOT;

export const user = {
  // Attempt to fetch the user details
  fetchUser(dispatch) {
    dispatch(log.info("Requesting user detail", "Request User"));
    dispatch(startLoading());
    // promise middleware appends _PENDING, _FULFILLED and _REJECTED as necessary
    return new Promise((resolve, reject) => {
      const nocache = `_=${Date.now()}`;
      const url = `${endpoint}?${nocache}`
      fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            accept: "application/json"
          }
        })
        .then((res) => {
          const logMessage = `Received ${res.status} response from ${url}.`;
          if (res.ok) {
            // success
            dispatch(log.success(logMessage, res.statusText));
            return res.json();
          } else if (res.status === 403) {
            // not authenticated
            dispatch(log.warn(logMessage, res.statusText));
          } else {
            // network error
            dispatch(log.error(logMessage, res.statusText));
          }
          return Promise.reject(new Error("Failed to fetch user"));
        })
        .then((json) => {
          dispatch(log.log(JSON.stringify(json), "User object"));
          dispatch(stopLoading());
          resolve(json);
        })
        .catch((error) => {
          dispatch({
            type: USER_DRAWER_TOGGLE,
            open: true
          });
          dispatch(log.error(error.message, "Authentication Error"));
          dispatch(stopLoading());
          reject(error);
        });

    });
  },
  logoutUser(dispatch) {
    dispatch(log.info("Attempting to logout", "Logout"));
    dispatch(startLoading());
    return new Promise((resolve, reject) => {
      const url = `${endpoint}?logout=1`;
      fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          accept: "application/json"
        }
      })
      .then((res) => {
        const logMessage = `Received ${res.status} response from ${url}.`;
        if (res.ok) {
          dispatch(stopLoading());
          return dispatch(log.success(logMessage, res.statusText));
        } else {
          dispatch(log.error(logMessage, res.statusText));
        }
        return Promise.reject(new Error("Failed to logout"));
      })
      .catch((error) => {
        dispatch(log.error(error.message, "Authentication Error"));
        dispatch(stopLoading());
        reject(error);
      });
    });
  },
  loginUser(login, dispatch) {
    dispatch(log.info("Attempting to login", "Login"));
    dispatch(startLoading());
    return new Promise((resolve, reject) => {
      fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify(login)
      })
      .then((res) => {
        const logMessage = `Received ${res.status} response from ${config.AUTH_ROOT}.`;
        if (res.ok) {
          dispatch(log.success(logMessage, res.statusText));
          dispatch(stopLoading());
          return dispatch({
            type: REQUEST_USER,
            payload: user.fetchUser(dispatch)
          });
        } else {
          dispatch(log.error(logMessage, res.statusText));
        }
        return Promise.reject(new Error("Failed to login"));
      })
      .catch((error) => {
        dispatch(log.error(error.message, "Authentication Error"));
        dispatch(stopLoading());
        reject(error);
      });
    });
  }
};
