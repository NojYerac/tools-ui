import React, {Component/*, PropTypes*/} from "react";
import App from "containers/App";
import Home from "containers/Home";
import {Router, Route, IndexRoute/*, Link */} from "react-router";
import {history} from "stores";
import {Users, User} from "@toolbox/tools-ui-account-management"



export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/users" component={Users}/>
          <Route path="/user/:id" component={User}/>
        </Route>
      </Router>
    );
  }
}

Routes.displayName = "Routes";
Routes.propTypes = {};
