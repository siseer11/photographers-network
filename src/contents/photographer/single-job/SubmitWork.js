// dependencies
import React, { Component } from "react";
import fire from "../../../config/Fire";

// high order component
import NavFooterWrapper from "../../shared/NavFooterWrapper";

// component
import LoadingPage from "../../../components/LoadingPage";
import PhotoUpload from "../../shared/PhotoUpload";
import WithModal from "../../../RenderProp/WithModal";
import { Button } from "../../../components/Button";
import { connect } from "react-redux";
import { addNewNotification } from "../../../redux/actions/notifications-action";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addNotification: (notification, uid) =>
    dispatch(addNewNotification(notification, uid))
});

class Submitwork extends Component {
  state = {
    images: [],
    jobId: null,
    loading: true,
    submitted: false
  };
  database = fire.database();
  storage = fire.storage();

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.jobid)
      this.setState({
        jobId: nextProps.match.params.jobid,
        loading: nextProps.loading
      });
  }

  //TODO: delete photos, if user refreshes and does not submit photos
  //TODO: if user refreshes and already submitted photos, he must not be able to submit new ones

  componentWillUnmount() {
    console.log("hi");
    if (!this.state.submitted) {
      this.state.images.forEach(image => {
        this.removeFromDatabaseAndStorage(image.id).then(() =>
          console.log("image removed!")
        );
      });
    }
  }

  showPhotos = images => {
    this.setState(
      prevState => ({ images: [...prevState.images, ...images] }),
      () => console.log(this.state.images)
    );
  };

  removeImage = id => {
    const index = this.state.images.findIndex(image => image.id === id);
    let imagesCopy = [...this.state.images];
    imagesCopy.splice(index, 1);
    this.setState(
      prevState => ({ images: imagesCopy }),
      () => this.removeFromDatabaseAndStorage(id)
    );
  };

  async removeFromDatabaseAndStorage(id) {
    const { jobId } = this.state;
    const { user } = this.props;
    try {
      await this.database
        .ref(`photographer/${user.uid}/applied-jobs/${jobId}/submitted-work/`)
        .child(id)
        .remove();
      await this.storage
        .ref(`${user.uid}/submitted-works/${jobId}`)
        .child(id)
        .delete();
    } catch (err) {
      console.log(err.message);
    }
  }

  submit = () => {
    const { user } = this.props;
    const { jobId, images } = this.state;
    this.database
      .ref("requests")
      .child(jobId)
      .once("value", snapshot => {
        const jobDescription = snapshot.val();
        this.addNotification(jobDescription, user, jobId);
        this.database
          .ref("requests")
          .child(jobId)
          .update({ "submitted-work": images });
        this.setState({ submitted: true });
      });
  };

  addNotification(jobDescription, user, jobId) {
    this.props.addNotification(
      {
        title: `${user.displayName} submitted his work for "${
          jobDescription.title
        }".`,
        link: `/progress-job/${jobId}`,
        read: false,
        time: new Date().getTime()
      },
      jobDescription.companyId
    );
  }

  render() {
    const { jobId, images } = this.state;
    const { user } = this.props;
    return this.state.loading === false ? (
      <div className="section-content with-padding">
        {!this.state.submitted ? (
          <React.Fragment>
            Submit your work here!
            <WithModal className="portofolio-add" closeItemClass="close">
              {({ showModal, closeModalListener }) => (
                <PhotoUpload
                  databaseRef={`photographer/${
                    user.uid
                  }/applied-jobs/${jobId}/submitted-work`}
                  storageRef={`${user.uid}/submitted-works/${jobId}`}
                  closeModalListener={closeModalListener}
                  showModal={showModal}
                  callBackFunction={this.showPhotos}
                  descriptionField={false}
                />
              )}
            </WithModal>
            <div className="image-container">
              {images.map((img, key) => (
                <div className="single-image-container" key={img.id}>
                  <img src={img.url} />
                  <div
                    className="img-hover"
                    onClick={() => this.removeImage(img.id)}
                  >
                    REMOVE
                  </div>
                </div>
              ))}
              {images.length > 0 && (
                <Button
                  classes="gb-btn gb-btn-medium gb-btn-primary"
                  clickHandler={this.submit}
                >
                  Submit to company
                </Button>
              )}
            </div>
          </React.Fragment>
        ) : (
          <h2>Successfully submitted!</h2>
        )}
      </div>
    ) : (
      <LoadingPage />
    );
  }
}

const SubmitWork = NavFooterWrapper(Submitwork);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitWork);
