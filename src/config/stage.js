"use strict";

import baseConfig from "./base";

let config = {
  appEnv: "stage",
  API_ROOT: "https://stage-api.rad.af",
  logLevel: 4,
  AUTH_ROOT: "https://stage-auth.rad.af"
};

export default Object.freeze(Object.assign({}, baseConfig, config));
