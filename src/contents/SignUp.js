import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import fire from "../config/Fire";
import { SingUpView } from "../components/SignUpView";
import NavFooterWrapper from "./shared/NavFooterWrapper";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    type: this.props.match.params.type || "photographer",
    location: ""
  };
  database = fire.database().ref();

  /**
   * Updates state to the current value of a certain target.
   * @param e
   */
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  optionSelectHandler = type => {
    this.setState({
      type: type
    });
  };

  showCustomSelectHandler = () => {
    this.setState(
      prevState => ({
        showCustomSelect: !prevState.showCustomSelect
      }),
      () => {
        if (this.state.showCustomSelect === true) {
          window.addEventListener("click", e => {
            if (!e.target.classList.contains("custom-select")) {
              this.setState({
                showCustomSelect: false
              });
            }
          });
        }
      }
    );
  };

  render() {
    const {
      name,
      email,
      password,
      password2,
      location,
      type,
      showCustomSelect
    } = this.state;
    const { userOn } = this.props;

    return (
      <SingUpView
        signupHandler={this.signup}
        name={name}
        changeHandler={this.handleChange}
        email={email}
        password={password}
        password2={password2}
        location={location}
        showCustomSelectHandler={this.showCustomSelectHandler}
        optionSelectHandler={this.optionSelectHandler}
        type={type}
        showCustomSelect={showCustomSelect}
      />
    );
  }
}

const mapStateToProps = state => ({
  userOn: state.user.userOn
});

export default connect(mapStateToProps)(SignUp);
