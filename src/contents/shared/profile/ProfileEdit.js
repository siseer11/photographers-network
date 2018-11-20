import React from "react";
import { connect } from "react-redux";

import { ProfileEditView } from "./ProfileEditView";
import { updateUserInfo } from "../../../redux/actions/profile-action";

const mapStateToProps = state => {
  const userData = state.firebase.profile;
  return {
    firstName: userData.firstName,
    lastName: userData.lastName,
    location: userData.location,
    photoURL: userData.photoURL,
    type: userData.type,
    companyName: userData.companyName,
    uid: state.firebase.auth.uid
  };
};

const mapDispatchToProps = dispatch => ({
  updateUserData: (name, location, photoURL, user) =>
    dispatch(updateUserInfo(name, location, photoURL, user))
});

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
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * Updates user.
   * @param e
   */
  updateUser = e => {
    e.preventDefault();
    let { firstName, lastName, location, photoURL, companyName } = this.state;
    const { uid, type, updateUserData } = this.props;

    updateUserData(
      firstName,
      lastName,
      location,
      photoURL,
      companyName,
      type
    ).then(() => this.props.history.replace(`/profile/${uid}`));
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

  render() {
    const { firstName, lastName, location, photoURL, companyName } = this.state;
    const { type, uid } = this.props;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEdit);
