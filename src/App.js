import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthListener } from "./redux/actions/user-action";

import "./style/gb-style.css";
import "./style/photographer-style.css";
import Routes from "./routes";
import LoadingPage from "./components/LoadingPage";

class App extends Component {
  componentDidMount() {
    //this.props.authListener();
  }
  render() {
    const { auth, profile } = this.props;
      return (
        <Routes
          userOn={auth.uid}
          userType={profile.type}
        />
      );
  }
}

const mapStateToProps = state => ({
  userDataLoading: state.user.userDataLoading,
  userData: state.user.userData,
  userOn: state.user.userOn,
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
