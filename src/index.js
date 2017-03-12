"use strict";
import "core-js/fn/object/assign";

import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import store from "stores";
// import Router from "./containers/Router";
import Routes from "routes";


import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("app")
);
