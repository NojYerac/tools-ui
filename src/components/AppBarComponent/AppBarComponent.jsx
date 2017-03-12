"use strict";

import config from "config";

import AppBar from "material-ui/AppBar"
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

// import SvgIcon from "material-ui/SvgIcon";
import React, {Component, PropTypes} from "react";

import MainDrawerComponent from "../MainDrawerComponent";
import LoggerComponent from "../LoggerComponent";
import UserDrawerComponent from "../UserDrawerComponent";

// import {user} from "../auth";
//import {Link} from "react-router";
import logo from "images/logo.svg";

export default class AppBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {ticking: 0, lastTick: 0};
  }

  componentDidMount() {
    const shortInterval = 120000; // 2 minutes
    const longInterval = 300000; // 5 minutes
    this.props.getUser();
    const ticking = setInterval(() => {
      const now = Date.now();
      const needsUserCheck = now > this.state.lastTick + longInterval;
      if (!this.props.user.cn || needsUserCheck) {
        this.setState({lastTick: now});
        this.props.getUser();
      }
    }, shortInterval);
    this.setState({ticking: ticking});
  }

  componentWillUnmount() {
    if (this.state.ticking) {
      clearInterval(this.state.ticking);
      this.setState({ticking: 0});
    }
  }

  render() {
    const {
      userDrawerToggle, userDrawer, user, loginUser, logoutUser,
      mainDrawerToggle, mainDrawer,
      logDrawerToggle,  setLogLevel, logDrawer, logs,
      routing
    } = this.props;
    const iconStyle = {marginTop: "-10px", marginLeft: "-10px"};
    return (
      <div className="appbar-component">
        <AppBar
          title={config.appName}
          onTitleTouchTap={mainDrawerToggle}
          iconElementLeft={
            <IconButton style={iconStyle} onTouchTap={mainDrawerToggle}>
              <Avatar src={logo} />
            </IconButton>
          }
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: "right", vertical: "top"}}
              anchorOrigin={{horizontal: "right", vertical: "top"}}
            >
              <MenuItem primaryText={config.appEnv} />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText={`User: ${user.username || "nobody"}`} onTouchTap={userDrawerToggle}/>
              <MenuItem primaryText="Logs" onTouchTap={logDrawerToggle} />
            </IconMenu>
          }
        />
        <MainDrawerComponent
          open={mainDrawer.open}
          toggle={mainDrawerToggle}
          routing={routing} />
        <LoggerComponent
          open={logDrawer.open}
          toggle={logDrawerToggle}
          logs={logs}
          logLevel={logDrawer.logLevel}
          setLogLevel={setLogLevel} />
        <UserDrawerComponent
          open={userDrawer.open}
          toggle={userDrawerToggle}
          user={user}
          loginUser={loginUser}
          logoutUser={logoutUser}/>
      </div>
    );
  }
}

AppBarComponent.displayName = "AppBarComponent";

AppBarComponent.propTypes = {
  userDrawerToggle: PropTypes.func.isRequired,
  userDrawer: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  mainDrawerToggle: PropTypes.func.isRequired,
  mainDrawer: PropTypes.object.isRequired,
  logDrawerToggle: PropTypes.func.isRequired,
  logDrawer: PropTypes.object.isRequired,
  logs: PropTypes.array.isRequired,
  setLogLevel: PropTypes.func.isRequired,
  routing: PropTypes.object.isRequired
};
