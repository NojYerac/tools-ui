"use strict";
import React, {Component, PropTypes} from "react";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import * as colors from "material-ui/styles/colors";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import AlertWarning from "material-ui/svg-icons/alert/warning";
import AlertError from "material-ui/svg-icons/alert/error";
import ActionCheckCircle from "material-ui/svg-icons/action/check-circle";
import ActionInfo from "material-ui/svg-icons/action/info";
// const colorMap = {
//   info: colors.cyan100,
//   default: colors.blueGrey100,
//   warning: colors.amber100,
//   success: colors.lightGreen100,
//   error: colors.red100
// };

const iconMap = {
  info: (<ActionInfo color={colors.cyan500} />),
  default: (<ActionInfo color={colors.blueGrey500} />),
  warning: (<AlertWarning color={colors.amber500} />),
  success: (<ActionCheckCircle color={colors.lightGreen500} />),
  error: (<AlertError color={colors.red500} />)
};

var levelMap = {
  all: 4,
  information: 3,
  warning: 2,
  minimal: 1
};

export default class LoggerComponent extends Component {
  renderLog(log, i) {
    const ts = (new Date(log.ts)).toLocaleTimeString();
    return (
      <div key={i}>
        <ListItem
          leftIcon={iconMap[log.type]}
          primaryText={`${log.title} - ${ts}`}
          secondaryText={log.message} />
        <Divider/>
      </div>
    );
  }

  filterLog(log) {
    const {logLevel} = this.props
    return log.level <= (logLevel || 2);
  }

  render() {
    const {open, logs, toggle, logLevel, setLogLevel} = this.props
    return (
      <div className="logger-component">
        <Drawer open={open} docked={false} onRequestChange={toggle} openSecondary={true} width={400} ref={(c) => {this.logger = c;}}>
          <AppBar title="Logs" iconElementLeft={
            <IconButton onTouchTap={toggle} >
              <NavigationClose />
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
              {Object.keys(levelMap).map((level, i)=>(
                <MenuItem
                  primaryText={level}
                  onTouchTap={() => setLogLevel(levelMap[level])}
                  key={i}
                  insetChildren={true}
                  checked={logLevel === levelMap[level]} />
              ))}
            </IconMenu>
          }/>
          <List>{logs.filter(this.filterLog.bind(this)).map(this.renderLog)}</List>
        </Drawer>
      </div>
    );
  }
}

LoggerComponent.displayName = "LoggerComponent";

LoggerComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  logLevel: PropTypes.number.isRequired,
  setLogLevel: PropTypes.func.isRequired,
  logs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    ts: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["default", "info", "warning", "success", "error"]).isRequired
  })).isRequired
};
