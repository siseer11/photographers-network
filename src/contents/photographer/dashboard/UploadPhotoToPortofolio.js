import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { uploadPortofolioPhoto } from "../../../redux/actions/user-action";

class UploadPhotoToPortofolio extends React.Component {
  static propTypes = {
    closeModalListener: PropTypes.func.isRequired,
    showModal: PropTypes.bool
  };

  state = {
    imageFile: "",
    imageDescription: "",
    stage: "Submit",
    imagePreviewLink: ""
  };

  fileChanged = e => {
    const file = e.target.files[0];
    const createImageUrl = URL.createObjectURL(file);

    this.setState({
      imageFile: file,
      imagePreviewLink: createImageUrl
    });
  };

  descriptionChange = e => {
    this.setState({
      imageDescription: e.target.value
    });
  };

  formSubmit = e => {
    e.preventDefault();
    const { imageFile, imageDescription } = this.state;
    const { uid, userData, uploadPhotoToPortfolio } = this.props;

    this.setState({
      stage: "Loading..."
    });

    uploadPhotoToPortfolio(imageFile, imageDescription, uid, userData)
      .then(() => {
        this.setState({
          stage: "Done!"
        });
      })
      .catch(() => {
        this.setState({
          stage: "Error!"
        });
      });
  };

  render() {
    const { imageDescription, stage, imagePreviewLink } = this.state;
    return (
      <React.Fragment>
        <div className="add-image-plus">+</div>
        <div
          style={{ display: this.props.showModal ? "flex" : "none" }}
          className="add-image-modal"
        >
          <form onSubmit={this.formSubmit}>
            {imagePreviewLink && (
              <img
                src={imagePreviewLink}
                style={{
                  width: 250,
                  height: 250,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
                alt="your image"
              />
            )}
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

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  userData: state.firebase.profile
});

const mapDispatchToProps = dispatch => ({
  uploadPhotoToPortfolio: (
    imageFile,
    imageDescription,
    uid,
    photographerData
  ) =>
    dispatch(
      uploadPortofolioPhoto(imageFile, imageDescription, uid, photographerData)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadPhotoToPortofolio);
