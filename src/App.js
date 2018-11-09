import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthListener } from "./redux/actions/user-action";

import "./style/gb-style.css";
import "./style/photographer-style.css";
import Routes from "./routes";

class App extends Component {
  componentDidMount() {
    this.props.authListener();
  }
  render() {
    const { userDataLoading, userData, userOn } = this.props;
    if (userDataLoading) {
      return <h2>Loading... </h2>;
    } else {
      return (
        <Routes
          userOn={this.props.userOn}
          userType={this.props.userData.type}
          updateUserInfo={this.updateUserInfo}
          setLoadingTrue={this.setLoadingTrue}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  userDataLoading: state.user.userDataLoading,
  userData: state.user.userData,
  userOn: state.user.userOn
});

const mapDispatchToProps = dispatch => ({
  authListener: () => dispatch(setAuthListener())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

/*

      */
