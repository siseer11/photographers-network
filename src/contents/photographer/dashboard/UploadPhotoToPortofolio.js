import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { uploadPortofolioPhoto } from "../../../redux/actions/photographer-actions";

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

  //File input value changing
  fileChanged = e => {
    const file = e.target.files[0];
    const createImageUrl = URL.createObjectURL(file);

    this.setState({
      imageFile: file,
      imagePreviewLink: createImageUrl
    });
  };

  //Text input (description) field value changing
  descriptionChange = e => {
    this.setState({
      imageDescription: e.target.value
    });
  };

  //Submit form , upload the photo to the profile
  formSubmit = e => {
    e.preventDefault();
    const { imageFile, imageDescription } = this.state;
    const {
      uid,
      userData,
      uploadPhotoToPortfolio,
      closeModalListener
    } = this.props;

    this.setState({
      stage: "Loading..."
    });

    uploadPhotoToPortfolio(imageFile, imageDescription, uid, userData)
      .then(() => {
        this.setState({
          stage: "Done!"
        });

        setTimeout(() => {
          closeModalListener();
          this.setState({
            imageFile: "",
            imageDescription: "",
            stage: "Submit",
            imagePreviewLink: ""
          });
        }, 500);
      })
      .catch(err => {
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
                alt={imageDescription}
              />
            )}
            <input
              className="add-image-input"
              type="file"
              onChange={this.fileChanged}
              accept=".jpg, .jpeg, .png"
              disabled={stage !== "Submit"}
            />
            <input
              onChange={this.descriptionChange}
              type="text"
              value={imageDescription}
              placeholder="Image description"
              disabled={stage !== "Submit"}
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
