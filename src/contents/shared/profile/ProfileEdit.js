import React from "react";
import { connect } from "react-redux";

import { ProfileEditView } from "./ProfileEditView";
import {fetchProfileInfos, updateUserInfo} from "../../../redux/actions/profile-action";


const mapStateToProps = state => {
  const profileData = state.profiles.data[state.firebase.auth.uid];
  console.log(profileData);
  return {
    user: state.user.userData,
    displayName: profileData ? profileData.displayName : "",
    photoURL: profileData ? profileData.photoURL : "",
    location: profileData ? profileData.location : "",
  };
};

const mapDispatchToProps = dispatch => ({
  updateUserData: (name, location, photoURL, user) => dispatch(updateUserInfo(name, location, photoURL, user)),
  fetchProfileInfos: uid => dispatch(fetchProfileInfos(uid))
});

class ProfileEdit extends React.Component {
  state = {
    name: this.props.displayName,
    location: this.props.location,
    photoURL: this.props.photoURL
  };

  componentDidMount() {
    this.props.fetchProfileInfos(this.props.user.uid);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({name: nextProps.displayName, photoURL: nextProps.photoURL, location: nextProps.location});
  }

   /**
   * Updates state to the current value of a certain target.
   * @param e
   */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * Updates user.
   *
   * @param e
   */
  updateUser = e => {
    e.preventDefault();
    let { name, location, photoURL } = this.state;
    const { user } = this.props;

    if (name !== "" && location !== "" && photoURL !== "") {
      this.props.updateUserData(name, location, photoURL, user)
        .then(()=> this.props.history.replace(`/profile/${user.uid}`));
    } else {
      console.log("Please fill in the all input fields");
    }
  };

  render() {
    const { name, location } = this.state;
    const { user } = this.props;

    return (
      <ProfileEditView
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);

/*
Update user logic :

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


*/
