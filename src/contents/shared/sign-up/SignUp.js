import React, { Component } from "react";
import { connect } from "react-redux";
import { sigUpUser } from "../../../redux/actions/user-action";
import { actionReset } from "../../../redux/actions/generalLoadingErrorSucces-actions";

import { SingUpView } from "../../../components/SignUpView";

class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    password2: "",
    type: this.props.match.params.type || "photographer",
    locationPlaceholder: "",
    locations: {}
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
      type: type,
      firstName: "",
      lastName: "",
      companyName: ""
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

  //Reset the general loading when unmountin
  componentWillUnmount() {
    this.props.actionReset();
  }

  render() {
    return (
      <SingUpView
        signupHandler={this.signup}
        changeHandler={this.handleChange}
        showCustomSelectHandler={this.showCustomSelectHandler}
        optionSelectHandler={this.optionSelectHandler}
        {...this.state}
        loadingDB={this.props.loadingDB}
        errorDB={this.props.errorDB}
        succesDB={this.props.succesDB}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  loadingDB: state.generalLoadingErrorSucces.loading,
  errorDB: state.generalLoadingErrorSucces.error,
  succesDB: state.generalLoadingErrorSucces.succes
});

const mapDispatchToProps = dispatch => ({
  signUserUp: userData => dispatch(sigUpUser(userData)),
  actionReset: () => dispatch(actionReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
