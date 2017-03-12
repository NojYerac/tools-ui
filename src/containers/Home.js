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
import * as logActions from "actions/log";
import * as color from "material-ui/styles/colors";
import config from "config";
import typography from "material-ui/styles/typography";
import Avatar from "material-ui/Avatar";
import Paper from "material-ui/Paper";
import logo from "images/logo.svg";

/* Populated by react-webpack-redux:reducer */
class Home extends Component {

  render() {
    const style = {
      container: {
        fontFamily: "Roboto, sans-serif",
        textAlign: "center",
        padding: "6em",
        backgroundColor: color.cyan500,
        color: color.darkWhite
      },
      h1: {
        fontSize: "56px",
        margin: "0px",
        fontWeight: typography.fontWeightLight
      },
      h2: {
        fontSize: "24px",
        fontWeight: typography.fontWeightLight,
        lineHeight: "28px",
        marginTop: "0px",
        marginBottom: 13,
        letterSpacing: 0
      },
      logoPaper: {
        height: 100,
        width: 100,
        margin: 10,
        textAlign: "center",
        display: "inline-block",
        backgroundColor: color.cyan500
      }
    };
    return (
      <div style={style.container}>
        <Paper style={style.logoPaper} zDepth={1} circle={true}>
          <Avatar size={100} src={logo} />
        </Paper>
        <h1 style={style.h1}>{config.appName}</h1>
        <h2 style={style.h2}>{config.tagLine}</h2>
      </div>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
Home.displayName = "Home"
Home.propTypes = {
  actions: PropTypes.shape({
    log: PropTypes.object.isRequired
  }).isRequired,
  logs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
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
  const actions = {};
  const actionMap = {actions: bindActionCreators(actions, dispatch)};
  actionMap.actions.log = bindActionCreators(logActions, dispatch);
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
