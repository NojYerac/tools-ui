"use strict";

import baseConfig from "./base";

let config = {
  appEnv: "test",
  API_ROOT: "http://localhost:8001",
  logLevel: 0,
  AUTH_ROOT: ""
};

export default Object.freeze(Object.assign(baseConfig, config));
