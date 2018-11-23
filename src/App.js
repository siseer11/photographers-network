import React, { Component } from "react";
import { connect } from "react-redux";

import "./style/gb-style.css";
import "./style/photographer-style.css";
import Routes from "./routes";

class App extends Component {
  render() {
    const { auth, profile } = this.props;
    if (profile.isLoaded) {
      return <Routes userOn={auth.uid} userType={profile.type} />;
    } else {
      return <h2>STILL LOADING FOR THE PROFILE DATA... HANG ON!</h2>;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(App);
