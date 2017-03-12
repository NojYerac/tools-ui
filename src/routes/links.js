import React from "react";
import ActionHome from "material-ui/svg-icons/action/home";
import ActionSupervisorAccount from "material-ui/svg-icons/action/supervisor-account"
export default [{
  path: "/",
  menuItemProps: {
    primaryText: "Home",
    rightIcon: (<ActionHome />)
  }
}, {
  path: "/users",
  menuItemProps: {
    primaryText: "User Management",
    rightIcon: (<ActionSupervisorAccount/>)
  }
}];
