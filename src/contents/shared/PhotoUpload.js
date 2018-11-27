// dependencies
import React, {Component} from 'react';
import { connect } from "react-redux";
import {addToDatabase, addToStorage} from "../../redux/actions/photo-upload-action";

class PhotoUpload extends Component {
  state = {
    imageFiles: [],
    imageDescription: "",
    stage: "Submit",
    images: [],
  };

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

  /**
   * Adds file to storage and db.
   *
   * @param file
   * @param storageRef
   * @param collection
   * @param doc
   * @param resolve
   * @param reject
   */
  addToStorageAndDB = (file, storageRef, collection, doc, resolve, reject) => {
    const fileId = new Date().getTime(); // generate random id
    this.setState({
      stage: "Loading..."
    });
    this.props.addToStorage(storageRef, file, fileId)
      .then(downloadURL => {
        this.props.addToDatabase(collection, doc, {url: downloadURL, id: fileId}, `submittedWork.${fileId}`)
          .then(()=> this.setState({imageFiles: "", imageDescription: ""}, () => resolve()))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  };

  /**
   * Handles the form submit.
   *
   * @param e
   */
  formSubmit = e => {
    e.preventDefault();
    console.log("hey there!");
    const {imageFiles} = this.state;
    const {collection, doc, storageRef, closeModalListener} = this.props;
    let promises = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      promises.push(new Promise((resolve, reject) =>
        this.addToStorageAndDB(file, storageRef, collection, doc, resolve, reject)
      ));
    }
    Promise.all(promises).then(() => {
      setTimeout(() => {
        closeModalListener();
        console.log("promises resolved");
        this.props.callback();
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
          className="add-image-modal close"
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

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  addToStorage: (storageRef, file, fileId) => dispatch(addToStorage(storageRef, file, fileId)),
  addToDatabase: (collection, doc, data, fileId) => dispatch(addToDatabase(collection, doc, data, fileId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoUpload);