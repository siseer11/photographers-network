// dependencies
import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

// high order component
import NavFooterWrapper from '../../shared/NavFooterWrapper';

// component
import LoadingPage from "../../../components/LoadingPage";
import PhotoUpload from "../../shared/PhotoUpload";
import WithModal from "../../../RenderProp/WithModal";
import {Button} from "../../../components/Button";
import {connect} from "react-redux";
import {addNewNotification} from "../../../redux/actions/notifications-action";
import {removeImgFromDBandStore, submitWork} from "../../../redux/actions/single-job-action-photographer";

const mapStateToProps = state => ({
  jobDescription: state.singleJob.jobDescription,
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const mapDispatchToProps = dispatch => ({
  addNotification: notification => dispatch(addNewNotification(notification)),
  submitWorkForJob: (jobId, images) => dispatch(submitWork(jobId, images)),
  removeImgFromDBandStore: (jobId, id) => dispatch(removeImgFromDBandStore(jobId, id))
});

class Submitwork extends Component {
  state = {
    images: [],
    jobId: null,
    loading: true,
    submitted: false,
  };

  componentDidMount() {
    window.onbeforeunload = this.removeImages;
  }

  componentWillUnmount() {
    this.removeImages();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.jobid)
      this.setState({
        jobId: nextProps.match.params.jobid,
        loading: nextProps.loading
      });
  }

  //TODO: if user refreshes and already submitted photos, he must not be able to submit new ones

  showPhotos = (images) => {
    this.setState(prevState => ({images: [...prevState.images, ...images]}), () => console.log(this.state.images));
  };

  removeImage = id => {
    const index = this.state.images.findIndex(image => image.id === id);
    let imagesCopy = [...this.state.images];
    imagesCopy.splice(index, 1);
    this.setState(prevState => ({images: imagesCopy}),
      () => this.props.removeImgFromDBandStore(this.state.jobId, id));
  };

  removeImages() {
    const {submitted, images} = this.state;
    if (!submitted) {
      images.forEach(image => {
        this.props.removeImgFromDBandStore(this.state.jobId, image.id)
          .then(() => console.log("image removed!"));
      });
    }
  }

  submit = () => {
    const {profile, jobDescription} = this.props;
    const {jobId, images} = this.state;
    this.props.submitWorkForJob(jobId, images);
    const notification = {
      title: `${profile.firstName} ${profile.lastName} submitted his work for "${
        jobDescription.title
        }".`,
      link: `/progress-job/${jobId}`,
      read: false,
      time: new Date(),
      recipientUserId: jobDescription.companyId
    };
    this.props.addNotification(notification);
    this.setState({submitted: true});
  };

  render() {
    const {jobId, images} = this.state;
    const {auth} = this.props;
    return (
      this.state.loading === false ? (
        <div className="section-content with-padding">
          {!this.state.submitted ?
            <React.Fragment>
              Submit your work here!
              <WithModal className="portofolio-add" closeItemClass="close">
                {({showModal, closeModalListener}) => (
                  <PhotoUpload databaseRef={`photographer/${auth.uid}/applied-jobs/${jobId}/submitted-work`}
                               storageRef={`${auth.uid}/submitted-works/${jobId}`}
                               closeModalListener={closeModalListener}
                               showModal={showModal}
                               callBackFunction={this.showPhotos}
                               descriptionField={false}
                  />
                )}
              </WithModal>

              <div className="image-container">
                {
                  images.map((img, key) =>
                    <div className="single-image-container" key={img.id}>
                      <img src={img.url}/>
                      <div className="img-hover" onClick={() => this.removeImage(img.id)}>REMOVE</div>
                    </div>
                  )
                }
                {
                  images.length > 0 &&
                  <Button classes="gb-btn gb-btn-medium gb-btn-primary" clickHandler={this.submit}>Submit to
                    company</Button>
                }
              </div>
            </React.Fragment> :
            <Redirect to={`/progress-job/${jobId}`}/>
          }
        </div>
      ) : (
        <LoadingPage/>
      )
    );
  }
}

const SubmitWork = NavFooterWrapper(Submitwork);
export default connect(mapStateToProps, mapDispatchToProps)(SubmitWork);