"use strict";
import React, {Component, PropTypes} from "react";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import * as colors from "material-ui/styles/colors";

const styles = {
  loginForm: {
    padding: "10px"
  },
  error: {
    color: colors.red500
  }
}

export default class UserDrawerComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {username: "", password: "", failed: false};
    this.getLoginForm = this.getLoginForm.bind(this);
    this.getUserContent = this.getUserContent.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {user} = this.props;
    const nextUser = nextProps.user;
    if (user.username === undefined) {
      // was not logged in
      if (nextUser.username === undefined) {
        // still isn't logged in
        this.setState({password: "", failed: true});
      } else {
        this.setState({password: "", failed: false});
      }
    } else {
      // was logged in
      this.setState({password: "", failed: false});
    }
  }

  setUsername(event) {
    const username = event.target.value;
    this.setState({username});
  }

  setPassword(event) {
    const password = event.target.value;
    this.setState({password});
  }

  loginUser() {
    const {loginUser} = this.props;
    const {username, password} = this.state;
    loginUser({username, password});
    // setTimeout(() => this.setState({password: "", failed: true}), 1500);
  }

  handleKeyUp(event) {
    const {username, password} = this.state;
    if (!event.metaKey && !event.ctrlKey && username && password && event.which === 13) {
      this.loginUser();
    }
  }

  getLoginForm() {
    const {username, password, failed} = this.state;
    return (
      <div className="login-form" style={styles.loginForm}>
        <TextField
          onKeyUp={this.handleKeyUp}
          floatingLabelText="username"
          fullWidth= {true}
          value={username}
          onChange={this.setUsername}
        />
        <TextField
          onKeyUp={this.handleKeyUp}
          type="password"
          fullWidth= {true}
          floatingLabelText="password"
          value={password}
          onChange={this.setPassword}
        />
        {failed ? (<span style={styles.error}>Failed login attempt</span>) : null}
        <RaisedButton
          onTouchTap={this.loginUser}
          label="Login"
          primary={true}
          fullWidth={true}
        />
      </div>
    );
  }

  logoutUser() {
    const {logoutUser} = this.props;
    this.setState({username: "", password: "", failed: false});
    logoutUser()
  }

  getUserContent() {
    const {user} = this.props;
    const format = val => {
      if (typeof val === "string") {
        return val;
      }
      return JSON.stringify(val);
    }
    return (
      <List>
        <ListItem
          primaryText="Log Out"
          onTouchTap={this.logoutUser} />
        <Divider/>
        {Object.keys(user).sort().map((k, i) => (
          <div key={i}>
            <ListItem primaryText={k || ""} secondaryText={format(user[k])}/>
            <Divider/>
          </div>
        ))}
      </List>
    );
  }

  render() {
    const {open, toggle} = this.props
    return (
      <div className="userdrawer-component">
        <Drawer
          open={open}
          docked={false}
          onRequestChange={toggle}
          openSecondary={true}
          width={400}
        >
          <AppBar
            title="User"
            iconElementLeft={
              <IconButton onTouchTap={toggle}>
                <NavigationClose />
              </IconButton>
            }
          />{
            this.props.user.username ?
            this.getUserContent() :
            this.getLoginForm()
          }
        </Drawer>
      </div>
    );
  }
}

UserDrawerComponent.displayName = "UserDrawerComponent";

UserDrawerComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};
