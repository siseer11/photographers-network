// dependencies
import React, {Component} from 'react';
import fire from "../../config/Fire";
import {PropTypes} from "prop-types";

class PhotoUpload extends Component {
  state = {
    imageFiles: [],
    imageDescription: "",
    stage: "Submit",
    images: [],
  };
  storage = fire.storage();
  database = fire.database();

  /*
  static propTypes = {
    closeModalListener: PropTypes.func.isRequired,
    updateUserInfo: PropTypes.func.isRequired,
    showModal: PropTypes.bool
  };*/

  fileChanged = e => {
    this.setState({
      imageFiles: e.target.files
    });
  };

  descriptionChange = e => {
    this.setState({
      imageDescription: e.target.value
    });
  };

  addToStorage = (file, storageRef, databaseRef, resolve) => {
    // generate a random file id
    const fileId = this.database.ref(databaseRef).push().key;
    console.log("fileid:" + fileId);
    //create storage ref
    let storageReference = this.storage.ref(`${storageRef}/${fileId}`);
    //upload file
    let task = storageReference.put(file);

    this.setState({
      stage: "Loading..."
    });

    const that = this;
    task.on("state_changed",
      function progress(snap) {
        console.log(snap);
      },
      function error(err) {
        console.log(err);
      },
      function complete() {
        task.snapshot.ref
          .getDownloadURL()
          .then(downloadURL => {
              that.setState(prevState => (
                  {
                    images: [...prevState.images, {url: downloadURL, id: fileId}],
                  }),
                () => that.addToDatabase(databaseRef, fileId, downloadURL, resolve));
            }
          );
      }
    );
  };

  addToDatabase = (databaseRef, fileId, downloadURL, resolve) => {

    this.database.ref(databaseRef).child(fileId).set(
      {
        id: fileId,
        link: downloadURL
      },
      err => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");

          this.setState({
            imageFiles: "",
            imageDescription: ""
          }, () => resolve());
        }
      }
    );
  };

  formSubmit = e => {
    e.preventDefault();
    const {imageFiles} = this.state;
    const {databaseRef, storageRef, closeModalListener, callBackFunction} = this.props;
    let promises = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      promises.push(new Promise((resolve, reject) => this.addToStorage(file, storageRef, databaseRef, resolve)));
    }
    Promise.all(promises).then(() => {
      setTimeout(() => {
        closeModalListener();
        console.log("hello");
        callBackFunction(this.state.images);
        this.setState({stage: "Submit", images: []});
      }, 500);
    });
  };

  render() {
    const {imageDescription, stage} = this.state;
    const {descriptionField} = this.props;

    return (
      <React.Fragment>
        <div className="add-image-plus">+</div>
        <div
          style={{display: this.props.showModal ? "flex" : "none"}}
          className="add-image-modal"
        >
          <div>
            <form onSubmit={this.formSubmit}>
              <input
                className="add-image-input"
                type="file"
                onChange={this.fileChanged}
                accept=".jpg, .jpeg, .png"
                multiple
              />
              {
                descriptionField &&
                <input
                  onChange={this.descriptionChange}
                  type="text"
                  value={imageDescription}
                  placeholder="Image description"
                />
              }
              <input type="submit" value={stage} disabled={stage !== "Submit"}/>
            </form>
            <button onClick={this.props.closeModalListener}>Cancel</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PhotoUpload;