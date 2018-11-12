import React from "react";
import fire from "../../../config/Fire";
import { PropTypes } from "prop-types";

export default class UploadPhotoToPortofolio extends React.Component {
  static propTypes = {
    closeModalListener: PropTypes.func.isRequired,
    showModal: PropTypes.bool
  };

  state = {
    imageFile: "",
    imageDescription: "",
    stage: "Submit"
  };

  fileChanged = e => {
    const file = e.target.files[0];
    this.setState({
      imageFiles: file
    });
  };

  descriptionChange = e => {
    this.setState({
      imageDescription: e.target.value
    });
  };

  updateUserInDb = (fileId, imageDescription, downloadURL, changeState) => {
    const { user, updateUserInfo, closeModalListener } = this.props;
    const userId = user.uid;
    fire
      .database()
      .ref("users")
      .child(userId)
      .child("portofolio")
      .child(fileId)
      .set(
        {
          id: fileId,
          desc: imageDescription,
          link: downloadURL
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log("succes");
            changeState({
              stage: "Complete!"
            });
            const portofolio = [
              ...user.portofolio,
              {
                id: fileId,
                desc: imageDescription,
                link: downloadURL
              }
            ];

            updateUserInfo({ portofolio: portofolio });
            setTimeout(() => {
              closeModalListener();
            }, 500);
            changeState({
              imageFiles: "",
              imageDescription: "",
              stage: "Submit"
            });
          }
        }
      );
  };

  formSubmit = e => {
    e.preventDefault();
    const { imageFile, imageDescription } = this.state;
    const { user } = this.props;
    const userId = user.uid;

    const fileId = fire
      .database()
      .ref("users")
      .child(userId)
      .child("portofolio")
      .push().key;

    //create storage ref
    let storageRef = fire.storage().ref(`${userId}/portofolio/${fileId}`);
    //upload file
    let task = storageRef.put(imageFile);

    const changeState = obj =>
      this.setState({
        ...obj
      });

    changeState({
      stage: "Loading..."
    });

    const that = this;
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
            that.updateUserInDb(
              fileId,
              imageDescription,
              downloadURL,
              changeState
            )
          );
      }
    );
  };

  render() {
    const { imageDescription, stage } = this.state;
    return (
      <React.Fragment>
        <div className="add-image-plus">+</div>
        <div
          style={{ display: this.props.showModal ? "flex" : "none" }}
          className="add-image-modal"
        >
          <form onSubmit={this.formSubmit}>
            <input
              className="add-image-input"
              type="file"
              onChange={this.fileChanged}
              accept=".jpg, .jpeg, .png"
            />
            <input
              onChange={this.descriptionChange}
              type="text"
              value={imageDescription}
              placeholder="Image description"
            />
            <input type="submit" value={stage} disabled={stage !== "Submit"} />
          </form>
        </div>
      </React.Fragment>
    );
  }
}
