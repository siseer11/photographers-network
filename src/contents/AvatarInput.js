import React from "react";
import fire from "../config/Fire";
import { PropTypes } from "prop-types";

export default class AvatarInput extends React.Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    updateUserInfo: PropTypes.func.isRequired,
    userAvatar: PropTypes.string.isRequired
  };

  updateUserProfileInDb = (downloadURL, userId, updateUserInfo) => {
    fire
      .database()
      .ref("users")
      .child(userId)
      .update(
        {
          photoURL: downloadURL
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log("succes");
            updateUserInfo({ photoURL: downloadURL });
          }
        }
      );
  };

  changeHandler = e => {
    const updateUserProfileInDb = this.updateUserProfileInDb;
    const file = this.fileInput.files[0];

    //check if the file is less then 1MB
    if (file) {
      if (file.size > 1100000) {
        console.log("The file must be under 1MB. Please conform to the rules!");
      } else {
        const userId = this.props.uid;
        const updateUserInfo = this.props.updateUserInfo;

        //create storage ref
        let storageRef = fire.storage().ref(`${userId}/avatar`);

        //upload file
        let task = storageRef.put(file);

        task.on(
          "state_changed",
          function progress(snap) {
            console.log(snap);
          },
          function error(err) {
            console.log(err);
          },
          function complete() {
            task.snapshot.ref
              .getDownloadURL()
              .then(downloadURL =>
                updateUserProfileInDb(downloadURL, userId, updateUserInfo)
              );
          }
        );
      }
    }
  };

  render() {
    return (
      <div
        className="z"
        style={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <label>
          <img
            style={{ cursor: "pointer" }}
            className="gb-avatar gb-avatar-x-large"
            src={this.props.userAvatar}
            alt="avatar"
          />
          <input
            style={{ display: "none" }}
            ref={node => (this.fileInput = node)}
            onChange={this.changeHandler}
            type="file"
            accept=".jpg, .jpeg, .png"
          />
        </label>
      </div>
    );
  }
}
