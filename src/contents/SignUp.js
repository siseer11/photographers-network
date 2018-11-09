import React, { Component } from "react";
import { connect } from "react-redux";
import { sigUpUser } from "../redux/actions/signUp-action";

import { SingUpView } from "../components/SignUpView";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    type: this.props.match.params.type || "photographer",
    location: ""
  };

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

  signup = e => {
    e.preventDefault();
    this.props.signUserUp(this.state);
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

const mapDispatchToProps = dispatch => ({
  signUserUp: userData => dispatch(sigUpUser(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
