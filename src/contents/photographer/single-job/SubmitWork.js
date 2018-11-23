// dependencies
import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

// component
import PhotoUpload from "../../shared/PhotoUpload";
import WithModal from "../../../RenderProp/WithModal";
import {Button} from "../../../components/Button";
import {connect} from "react-redux";
import {addNewNotification} from "../../../redux/actions/notifications-action";
import {submitWork} from "../../../redux/actions/single-job-action-photographer";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import LoadingPage from "../../../components/LoadingPage";
import {removeFromDatabase, removeFromStorage} from "../../../redux/actions/photo-upload-action";

class SubmitWork extends Component {
  state = {
    images: [],
    jobId: this.props.match.params.jobid,
    loading: true,
    submitted: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.jobid)
      this.setState({
        jobId: nextProps.match.params.jobid
      });
  }

  removeImage = id => {
    this.props.removeFromDB("jobOffers", this.state.jobId, `submittedWork.${id}`);
    this.props.removeFromStorage(`${this.props.auth.uid}/submitted-works/${this.state.jobId}/${id}`);
  };

  submit = () => {
    const {profile, jobsData} = this.props;
    const {jobId} = this.state;
    const jobDescription = jobsData[jobId];
    this.props.submitWorkForJob(jobId);
    const notification = {
      title: `${profile.firstName} ${
        profile.lastName
      } submitted his work for "${jobDescription.title}".`,
      link: `/progress-job/${jobId}`,
      read: false,
      time: new Date(),
      recipientUserId: jobDescription.companyId
    };
    this.props.addNotification(notification);
    this.setState({ submitted: true });
  };

  render() {
    const {jobId} = this.state;
    const {auth, jobsData} = this.props;
    if(!jobsData) return <LoadingPage/>;
    const images = Object.values(jobsData[jobId].submittedWork);
    return (
        <div className="section-content with-padding">
          {!this.state.submitted ?
            <React.Fragment>
              Submit your work here!
              <WithModal className="portofolio-add" closeItemClass="close">
                {({showModal, closeModalListener}) => (
                  <PhotoUpload
                    collection={'jobOffers'}
                    doc={jobId}
                    databaseRef={`photographer/${auth.uid}/applied-jobs/${jobId}/submitted-work`}
                    storageRef={`${auth.uid}/submitted-works/${jobId}`}
                    closeModalListener={closeModalListener}
                    showModal={showModal}
                    descriptionField={false}
                  />
                )}
              </WithModal>

              <div className="image-container">
                {
                  images.map((img, key) =>
                    <div className="single-image-container" key={img.id}>
                      <img src={img.url} alt={img.id}/>
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
    );
  }
}

const mapStateToProps = state => ({
  jobDescription: state.singleJob.jobDescription,
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  jobsData: state.firestore.data.jobOffers
});

const mapDispatchToProps = dispatch => ({
  addNotification: notification => dispatch(addNewNotification(notification)),
  submitWorkForJob: jobId => dispatch(submitWork(jobId)),
  removeFromDB: (collection, doc, field) => dispatch(removeFromDatabase(collection, doc, field)),
  removeFromStorage: storageRef => dispatch(removeFromStorage(storageRef))
});

export default compose(
  firestoreConnect(props => [
    {
      collection: "jobOffers",
      doc: props.match.params.jobid
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(SubmitWork);
