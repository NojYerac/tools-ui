"use strict";
/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Main from "components/Main";
import * as logActions from "actions/log";
import * as loadingActions from "actions/loading";
import * as userActions from "actions/user";
import {mainDrawerToggle} from "actions/mainDrawer";
import {routerActions} from "react-router-redux";
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    return <Main {...this.props}/>;
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.shape({
    mainDrawerToggle: PropTypes.func.isRequired,
    log: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired,
    user: PropTypes.shape({
      userDrawerToggle: PropTypes.func.isRequired,
      requestUser: PropTypes.func.isRequired,
      loginUser: PropTypes.func.isRequired,
      logoutUser: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  logs: PropTypes.array.isRequired,
  loading: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userDrawer: PropTypes.object.isRequired,
  logDrawer: PropTypes.object.isRequired,
  mainDrawer: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = state;
  return props;
}

function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = Object.assign(bindActionCreators({mainDrawerToggle}, dispatch), {
    log: bindActionCreators(logActions, dispatch),
    loading: bindActionCreators(loadingActions, dispatch),
    routing: bindActionCreators(routerActions, dispatch),
    user: bindActionCreators(userActions, dispatch)
  });
  return {actions};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
