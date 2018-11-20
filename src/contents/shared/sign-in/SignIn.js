import React, { Component } from "react";
import { connect } from "react-redux";
import { signUserInAsync } from "../../../redux/actions/user-action";

import { EmailSVG } from "../../../components/svg/EmailSVG";
import { PasswordSVG } from "../../../components/svg/PasswordSVG";
import { Error } from "../../../components/Error";
import { InputField } from "../../../components/form/InputField";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  /**
   * Updates state to the current value of a certain target.
   * @param e
   */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    this.props.signInUser(this.state.email, this.state.password);
  };

  render() {
    const { loadingAuth, errorAuth, succesAuth } = this.props;

    return (
      <div>
        <div className="section-content with-padding">
          <form onSubmit={this.login}>
            <h1>Sign in</h1>
            <InputField
              wrapperClass="gb-input-wrapper"
              svg={
                <EmailSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
              }
              value={this.state.email}
              changeHandler={this.handleChange}
              type="email"
              name="email"
              placeholder="Enter email"
            />
            <InputField
              wrapperClass="gb-input-wrapper"
              svg={
                <PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
              }
              value={this.state.password}
              changeHandler={this.handleChange}
              type="password"
              name="password"
              placeholder="Password"
            />
            <div className="btn-container">
              {loadingAuth ? (
                <input
                  type="submit"
                  disabled={true}
                  style={{ opacity: 0.5 }}
                  className="gb-btn gb-btn-large gb-btn-primary"
                  value="Loading..."
                />
              ) : succesAuth ? (
                <input
                  type="submit"
                  disabled={true}
                  style={{ opacity: 1 }}
                  className="gb-btn gb-btn-large gb-btn-primary"
                  value="Succes"
                />
              ) : (
                <input
                  type="submit"
                  className="gb-btn gb-btn-large gb-btn-primary"
                  value="Sign in"
                />
              )}
            </div>
            {errorAuth && <Error message="Auth failed!" />}
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signInUser: (email, password) => dispatch(signUserInAsync(email, password))
});

const mapStateToProps = state => ({
  loadingAuth: state.generalLoadingErrorSucces.loading,
  errorAuth: state.generalLoadingErrorSucces.error,
  succesAuth: state.generalLoadingErrorSucces.succes
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
