import React, { Component } from "react";
import AuthForm from "./AuthForm";
import {
  login,
  signup,
  subscribeToAuthChanges,
} from "../../../api/FirebaseApi";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authMode: "login",
      checked: "",
    };
  }

  switchAuthMode = () => {
    this.setState((prevState) => ({
      authMode: prevState.authMode === "login" ? "signup" : "login",
    }));
  };

  render() {
    return (
      <AuthForm
        login={login}
        signup={signup}
        authMode={this.state.authMode}
        switchAuthMode={this.switchAuthMode}
      />
    );
  }
}

export default LoginScreen;
