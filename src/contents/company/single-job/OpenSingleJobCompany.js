import React from "react";
import { OpenSingleJobViewCompany } from "../../../components/single-job/open/OpenSingleJobViewCompany";
import { DeleteModal } from "../../../components/single-job/DeleteModal";
import { connect } from "react-redux";

import {
  declineApplicantForJob,
  acceptApplicantForJob,
  deleteCurrentJob
} from "../../../redux/actions/company-actions";

const mapDispatchToProps = dispatch => ({
  acceptApplicantForJob: (companyData, photographerData, jobData) =>
    dispatch(acceptApplicantForJob(companyData, photographerData, jobData)),
  declineApplicantForJob: (jobData, photographerId) =>
    dispatch(declineApplicantForJob(jobData, photographerId)),
  deleteCurrentJob: jobId => dispatch(deleteCurrentJob(jobId))
});

class OpenSingleJobCompany extends React.Component {
  state = {
    acceptedApplicant: this.props.acceptedApplicant,
    showDeleteModal: false
  };

  showDeleteModal = show => {
    this.setState({ showDeleteModal: show });
  };

  /**
   * Deletes job from every database node and redirects to dashboard.
   */
  deleteJob = () => {
    this.props.deleteCurrentJob(this.props.jobId);
  };

  /**
   * Removes applicant from the current job.
   *
   * @param uid
   */
  declineApplicant = uid => {
    const { jobData } = this.props;
    // remove applicant from database and state
    this.props.declineApplicantForJob(jobData, uid);
  };

  /**
   * Handles the accept of an applicant.
   * @param uid
   */
  acceptApplicant = (companyData, photographerData, jobData) => {
    //  DO   THE    THINGY !!
    this.props.acceptApplicantForJob(companyData, photographerData, jobData);
  };

  /**
   * Setting photographer for the job request after
   * successful payment.
   */
  successfulPayment = () => {
    const { jobId, jobDescription } = this.props;
    const { acceptedApplicant } = this.state;
    this.props.acceptApplicantForJob(acceptedApplicant, jobId);
    const notification = {
      title: `${
        jobDescription.companyName
      } has accepted you to execute the job request "${jobDescription.title}".`,
      link: `/progress-job/${jobId}`,
      read: false,
      time: new Date(),
      recipientUserId: acceptedApplicant.uid
    };
    this.props.addNotification(notification);
    this.props.history.replace(`/progress-job/${jobId}`);
  };

  render() {
    const { acceptedApplicant } = this.state;
    const { jobDescription, appliedPhotographers, downPayment } = this.props;
    return (
      <React.Fragment>
        {this.state.showDeleteModal && (
          <DeleteModal
            title="Do you really want to delete this job request?"
            description="Warning: you can't recover this job. We won't recommend you to delete a job in progress!"
            yesHandler={this.deleteJob}
            noHandler={() => this.showDeleteModal(false)}
          />
        )}
        <OpenSingleJobViewCompany
          showDeleteModal={this.showDeleteModal}
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

export default connect(
  null,
  mapDispatchToProps
)(OpenSingleJobCompany);
