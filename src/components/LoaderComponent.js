"use strict";

import React, {Component, PropTypes} from "react";
import Overlay from "material-ui/internal/Overlay"
import CircularProgress from "material-ui/CircularProgress";

export default class LoaderComponent extends Component {


  render() {
    const {show} = this.props;
    return (
      <div className="loader-component">
        <Overlay  style={{zIndex: "1300"}} show={show}/>
        {show ? (
          <CircularProgress size={2} style={{
            margin: "15% auto",
            left: 0,
            right: 0,
            position: "fixed",
            zIndex: "1301"
          }}/>
        ) : null}
      </div>
    );
  }
}

LoaderComponent.propTypes = {
  show: PropTypes.bool.isRequired
};
