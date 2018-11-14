import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthListener } from "./redux/actions/user-action";

import "./style/gb-style.css";
import "./style/photographer-style.css";
import Routes from "./routes";

class App extends Component {
  render() {
    const { auth, profile } = this.props;
    if (profile.isLoaded) {
      return <Routes userOn={auth.uid} userType={profile.type} />;
    } else {
      return (
        <h2>
          STILL LOADING FOR THE PROFILE DATA... HANG ON! (no spinner, i know...)
        </h2>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const mapDispatchToProps = dispatch => ({
  authListener: () => dispatch(setAuthListener())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
