import React from "react";
import {OpenSingleJobViewCompany} from "../../../components/single-job/open/OpenSingleJobViewCompany";
import {DeleteModal} from "../../../components/single-job/DeleteModal";
import {connect} from "react-redux";
import {addNewNotification} from "../../../redux/actions/notifications-action";
import {
  acceptApplicantForJob, declineApplicantForJob,
  deleteCurrentJob
} from "../../../redux/actions/single-job-action-company";

const mapDispatchToProps = dispatch => ({
  addNotification: (notification, uid) => dispatch(addNewNotification(notification, uid)),
  acceptApplicantForJob: (applicant, jobId) => dispatch(acceptApplicantForJob(applicant, jobId)),
  declineApplicantForJob: (uid, jobId) => dispatch(declineApplicantForJob(uid, jobId)),
  deleteCurrentJob: (jobId, companyId) => dispatch(deleteCurrentJob(jobId, companyId))
});

class OpenSingleJobCompany extends React.Component {
  state = {
    acceptedApplicant: this.props.acceptedApplicant,
    showDeleteModal: false
  };

  showDeleteModal = show => {
    this.setState({showDeleteModal: show});
  };

  /**
   * Deletes job from every database node and redirects to dashboard.
   */
  deleteJob = () => {
    this.props.deleteCurrentJob(this.props.jobId, this.props.jobDescription.companyId);
    this.props.history.replace('/dashboard');
  };

  /**
   * Removes applicant from the current job.
   *
   * @param uid
   */
  declineApplicant = uid => {
    const {jobId, jobDescription} = this.props;
    // remove applicant from database and state
    this.props.declineApplicantForJob(uid, jobId);
    const notification = {
      title: `${
        jobDescription.companyName
        } has declined your application for ${jobDescription.title}.`,
      link: `/open-job/${jobId}`,
      read: false,
      time: new Date().getTime()
    };
    this.props.addNotification(notification, uid);
  };

  /**
   * Handles the accept of an applicant.
   * @param uid
   */
  acceptApplicant = uid => {
    const {appliedPhotographers} = this.props;
    const photographer = appliedPhotographers.filter(
      user => user.uid === uid
    )[0];
    this.setState({acceptedApplicant: photographer});
  };

  /**
   * Setting photographer for the job request after
   * successful payment.
   */
  successfulPayment = () => {
    const {jobId, jobDescription} = this.props;
    const {acceptedApplicant} = this.state;
    this.props.acceptApplicantForJob(acceptedApplicant, jobId);
    const notification = {
      title: `${jobDescription.companyName} has accepted you to execute the job request "${jobDescription.title}".`,
      link: `/progress-job/${jobId}`,
      read: false,
      time: new Date().getTime()
    };
    this.props.addNotification(notification, acceptedApplicant.uid);
    this.props.history.replace(`/progress-job/${jobId}`);
  };

  render() {
    const {acceptedApplicant} = this.state;
    const {
      jobDescription,
      appliedPhotographers,
      downPayment
    } = this.props;
    return (
      <React.Fragment>
        {this.state.showDeleteModal &&
        <DeleteModal title="Do you really want to delete this job request?"
                     description="Warning: you can't recover this job. We won't recommend you to delete a job in progress!"
                     yesHandler={this.deleteJob}
                     noHandler={() => this.showDeleteModal(false)}
        />
        }
        <OpenSingleJobViewCompany showDeleteModal={this.showDeleteModal}
                                  acceptedApplicant={acceptedApplicant}
                                  appliedPhotographers={appliedPhotographers}
                                  acceptHandler={this.acceptApplicant}
                                  declineHandler={this.declineApplicant}
                                  downPayment={downPayment}
                                  price={jobDescription.price}
                                  successfulPaymentHandler={this.successfulPayment}
        />
      </React.Fragment>
    );
  }
}

export default connect(null, mapDispatchToProps)(OpenSingleJobCompany);
