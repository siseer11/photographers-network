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
    const { userData, userOn } = this.props;
    const userDataLoading = false;
    if (userDataLoading) {
      return <LoadingPage/>;
    } else {
      return (
        <Routes
          userOn={this.props.auth.uid}
          userType={this.props.userData.type}
          setLoadingTrue={this.setLoadingTrue}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  userDataLoading: state.user.userDataLoading,
  userData: state.user.userData,
  userOn: state.user.userOn,
  auth: state.firebase.auth
});

const mapDispatchToProps = dispatch => ({
  authListener: () => dispatch(setAuthListener())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
