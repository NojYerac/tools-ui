/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
"use strict";

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from "helpers/shallowRenderHelper";

import Main from "components/Main";

describe("MainComponent", () => {
    let MainComponent;
    let props = {
      actions: {
        log: {
          logDrawerToggle: () => {},
          setLogLevel: () => {},
          log: () => {},
          info: () => {},
          warn: () => {},
          success: () => {},
          error: () => {}
        },
        loading: {
          startLoading: () => {},
          stopLoading: () => {}
        },
        routing: {
          go: () => {},
          goBack: () => {},
          goForward: () => {},
          push: () => {},
          replace: () => {}
        },
        requestUser: () => {},
        userDrawerToggle: () => {},
        mainDrawerToggle: () => {}
      },
      loading: {},
      logs: [],
      user: {},
      userDrawer: {},
      logDrawer: {},
      mainDrawer: {}
    };
    beforeEach(() => {
      MainComponent = createComponent(Main, props);
    });

    it("should have its component name as default className", () => {
      expect(MainComponent.props.className).to.equal("index");
    });
});
