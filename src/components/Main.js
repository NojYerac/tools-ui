require("normalize.css");
require("styles/App.css");

import React, {Component, PropTypes} from "react";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import getMuiTheme from "material-ui/styles/getMuiTheme";
// import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import AppBarComponent from "./AppBarComponent";
import LoaderComponent from "./LoaderComponent";
import * as colors from "material-ui/styles/colors";

import config from "config";

export default class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  startTicking() {

  }

  stopTicking() {

  }

  componentDidMount() {
    this.startTicking();
  }

  componentWillUnmount() {
    this.stopTicking();
  }

  render() {
    const {
      mainDrawerToggle,
      log: {logDrawerToggle, setLogLevel},
      loading: {startLoading, stopLoading},
      user: {requestUser, userDrawerToggle, loginUser, logoutUser},
      routing
    } = this.props.actions;
    const {
      user, userDrawer, logs, mainDrawer, logDrawer, loading
    } = this.props;

    // const loggerProps = {logs: logs || [], removeLog};
    const appBarProps = {
      userDrawerToggle, userDrawer, user, getUser: requestUser,
      loginUser, logoutUser,
      mainDrawer, mainDrawerToggle,
      startLoading, stopLoading, setLogLevel,
      logDrawer, logDrawerToggle, logs, routing
    };

    const style = {
      pageFooter: {
        // paddingTop: "40px",
        // paddingBottom: "40px",
        marginTop: "80px",
        color: colors.grey500,
        textAlign: "center"
      },
      divider: {
        marginBottom: "2em"
      },
      label: {
        color: colors.grey500,
        textTransform: "none"
      }
    };

    return (
      <div className="index">
        {/*<MuiThemeProvider> muiTheme={getMuiTheme(darkBaseTheme)}>*/}
        <MuiThemeProvider>
          <div>
            <LoaderComponent show={!!loading.loading}/>
            <AppBarComponent {...appBarProps} />
            {this.props.children}
            <footer className="page-footer" style={style.pageFooter}>
              <Divider style={style.divider} />
              © {config.fullYear} Jon Carey
              <br/>
              <FlatButton
                labelStyle={style.label}
                label="Docs"
                onTouchTap={() => {
                  window.open(`${config.repoUrl}/blob/master/README.md`, "_blank");
                }} />
              |
              <FlatButton
                labelStyle={style.label}
                label="Issues"
                onTouchTap={() => {
                  window.open(`${config.repoUrl}/issues`, "_blank");
                }} />
            </footer>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

AppComponent.propTypes = {
  actions: PropTypes.shape({
    mainDrawerToggle: PropTypes.func.isRequired,
    log: PropTypes.shape({
      logDrawerToggle: PropTypes.func.isRequired,
      setLogLevel: PropTypes.func.isRequired,
      log: PropTypes.func.isRequired,
      info: PropTypes.func.isRequired,
      warn: PropTypes.func.isRequired,
      success: PropTypes.func.isRequired,
      error: PropTypes.func.isRequired
    }).isRequired,
    loading: PropTypes.shape({
      startLoading: PropTypes.func.isRequired,
      stopLoading: PropTypes.func.isRequired
    }).isRequired,
    routing: PropTypes.shape({
      go: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      goForward: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired
    }).isRequired,
    user: PropTypes.shape({
      requestUser: PropTypes.func.isRequired,
      userDrawerToggle: PropTypes.func.isRequired,
      loginUser: PropTypes.func.isRequired,
      logoutUser:  PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  loading: PropTypes.object.isRequired,
  logs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  userDrawer: PropTypes.object.isRequired,
  logDrawer: PropTypes.object.isRequired,
  mainDrawer: PropTypes.object.isRequired
};
