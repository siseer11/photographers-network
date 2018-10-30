import React from "react";
import fire from "../../config/Fire";
import { ProfileEditViewWithNav } from "./ProfileEditView";
import firebase from "firebase";

export class ProfileEdit extends React.Component {
  state = {
    name: this.props.user.displayName,
    location: "",
    photoURL: this.props.user.photoURL
  };
  /**
   * Updates state to the current value of a certain target.
   * @param e
   */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * Registers the user as photographer or company.
   * @param e
   */

  updateUser = e => {
    e.preventDefault();
    let { name, location, photoURL } = this.state;
    const database = fire.database().ref();
    const { user, updateUserInfo } = this.props;

    if (name !== "" && location !== "" && photoURL !== "") {
      // 1. Update
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: name,
          photoURL: photoURL
        })
        .then(() => {
          if (user.location !== location && location !== "") {
            database
              .child(`locations/${user.location}/${user.type}/${user.uid}`)
              .remove();

            database
              .child(`locations/${location}/${user.type}/${user.uid}`)
              .set({
                displayName: name,
                photoURL: photoURL
              });
          }
        })
        .then(() => {
          database
            .child("users")
            .child(user.uid)
            .update({
              location: location,
              displayName: name,
              photoURL: photoURL
            });
        })
        .then(() => {
          database
            .child(user.type)
            .child(user.uid)
            .update({
              location: location
            });
        })
        .then(() => {
          this.props.history.replace("/dashboard");
          updateUserInfo({
            location: location,
            displayName: name,
            photoURL: photoURL
          });
        });
    } else {
      console.log("Please fill in the all input fields");
    }
  };

  render() {
    const { name, location } = this.state;
    const { user, loading } = this.props;

    return (
      <ProfileEditViewWithNav
        updateUserHandler={this.updateUser}
        {...this.props}
        name={name}
        changeHandler={this.handleChange}
        location={location}
        user={user}
        photoURL={this.state.photoURL}
      />
    );
  }
}