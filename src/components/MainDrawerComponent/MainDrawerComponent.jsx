"use strict";

import config from "config";
import React, {Component, PropTypes} from "react";
import AppBar from "material-ui/AppBar"
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Drawer from "material-ui/Drawer";
import logo from "images/logo.svg";
import MenuItemsComponent from "./MenuItemsComponent";
import links from "routes/links";

const iconStyle = {
  marginTop: "-10px",
  marginLeft: "-10px"
};

export default class MainDrawerComponent extends Component {

  render() {
    const {open, toggle, routing} = this.props;
    return (
      <div className="maindrawer-component">
        <Drawer open={open}>
        <AppBar
          title={config.appName}
          onTitleTouchTap={toggle}
          iconElementLeft={
            <IconButton style={iconStyle} onTouchTap={toggle}>
              <Avatar src={logo} />
            </IconButton>
          }
        />
          <MenuItemsComponent links={links} routing={routing} />
        </Drawer>
      </div>
    );
  }
}

MainDrawerComponent.displayName = "MainDrawerComponent";

MainDrawerComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};
