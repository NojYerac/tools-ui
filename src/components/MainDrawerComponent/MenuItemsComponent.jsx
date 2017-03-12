"use strict";

import React, {Component, PropTypes} from "react";
import MenuItem from "material-ui/MenuItem"
export default class MenuItemsComponent extends Component {
  renderLink(lnk, i) {
    const {routing} = this.props;
    if (lnk.subLinks && lnk.subLinks.length) {
      lnk.menuItemProps.menuItems = lnk.subLinks.map((subLnk, j) => {
        let l = Object.assign({}, subLnk, {path: `${lnk.path}/${subLnk.path}`});
        return this.renderLink(l, j);
      });
    } else {
      lnk.menuItemProps.onTouchTap = () => routing.push(lnk.path);
    }
    return (
      <MenuItem key={i} {...lnk.menuItemProps} />
    );
  }

  render() {
    const {links} = this.props;
    return (
      <div className="menuitems-component">
        {links.map(this.renderLink.bind(this))}
      </div>
    );
  }
}

MenuItemsComponent.displayName = "MenuItemsComponent"

MenuItemsComponent.propTypes = {
  links: PropTypes.array.isRequired,
  routing: PropTypes.object.isRequired
};
