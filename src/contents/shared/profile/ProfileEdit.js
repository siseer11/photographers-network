import React from "react";
import {connect} from "react-redux";

import {ProfileEditView} from "./ProfileEditView";
import {updateUserInfo} from "../../../redux/actions/profile-action";
import {actionReset} from "../../../redux/actions/generalLoadingErrorSucces-actions";

class ProfileEdit extends React.Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    location: this.props.location,
    photoURL: this.props.photoURL,
    companyName: this.props.companyName
  };

  /**
   * Updates state to the current value of a certain target.
   * @param e
   */
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  /**
   * Updates user.
   * @param e
   */
  updateUser = e => {
    e.preventDefault();
    let {firstName, lastName, location, companyName} = this.state;
    const {uid, type, updateUserData, history} = this.props;

    updateUserData(
      firstName,
      lastName,
      location,
      companyName,
      type
    ).then(() => history.replace(`/profile/${uid}`));
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      firstName: nextProps.firstName,
      lastName: nextProps.lastName,
      companyName: nextProps.companyName,
      photoURL: nextProps.photoURL,
      location: nextProps.location
    });
  }

  componentWillUnmount() {
    this.props.actionReset();
  }

  render() {
    const {firstName, lastName, location, photoURL, companyName} = this.state;
    const {type, uid} = this.props;
    console.log(this.state);

    return (
      <ProfileEditView
        updateUserHandler={this.updateUser}
        type={type}
        uid={uid}
        firstName={firstName}
        lastName={lastName}
        companyName={companyName}
        changeHandler={this.handleChange}
        location={location}
        photoURL={photoURL}
      />
    );
  }
}

const mapStateToProps = state => {
  const userData = state.firebase.profile;
  return {
    firstName: userData.firstName,
    lastName: userData.lastName,
    location: userData.location,
    photoURL: userData.profileImageUrl,
    type: userData.type,
    companyName: userData.companyName,
    uid: state.firebase.auth.uid
  };
};

const mapDispatchToProps = dispatch => ({
  updateUserData: (firstName, lastName, location, companyName, type) =>
    dispatch(updateUserInfo(firstName, lastName, location, companyName, type)),
  actionReset: () => dispatch(actionReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEdit);
