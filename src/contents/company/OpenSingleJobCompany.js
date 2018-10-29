import React from "react";
import fire from "../../config/Fire";
import {OpenSingleJobViewCompany} from "../../components/single-job/open/OpenSingleJobViewCompany";
import {DeleteModal} from "../../components/single-job/DeleteModal";

export default class OpenSingleJobCompany extends React.Component {
  state = {
    appliedPhotographers: [],
    acceptedApplicant: "",
    downPayment: false,
    showDeleteModal: false,
    jobExists: true
  };
  database = fire.database();

  showDeleteModal = show => {
    this.setState({showDeleteModal: show});
  };

  /**
   * Deletes job from every database node and redirects to dashboard.
   *
   * @returns {Promise.<void>}
   */
  deleteJob = async () => {
    try {
      await (this.database.ref('requests').child(this.state.jobId).remove());
      await (this.database.ref('company').child(this.state.jobDescription.companyId).child('postedJobs').child(this.state.jobId).remove());
      let photographers = await ( this.database.ref('photographer').once('value'));
      photographers.forEach(async photographer => {
        console.log(photographer.key);
        await this.database.ref('photographer').child(photographer.key).child('applied-jobs').child(this.state.jobId).remove();
      });
      this.props.history.replace('/dashboard');
    } catch (err) {
      console.log("Error:" + err.message);
    }

  };

  /**
   * Removes applicant from the current job.
   *
   * @param uid
   */
  declineApplicant = uid => {
    const {jobId, jobDescription} = this.state;
    // remove applicant from database and state
    this.database
      .ref("requests")
      .child(jobId)
      .child("photographers-applied")
      .child(uid)
      .remove()
      .then(() => {
        let appliedPhotographersCopy = [...this.state.appliedPhotographers];
        let index = appliedPhotographersCopy.findIndex(
          photo => photo.uid === uid
        );
        appliedPhotographersCopy.splice(index, 1);
        this.setState({appliedPhotographers: appliedPhotographersCopy});
      });
    // add notification
    this.database
      .ref("users")
      .child(uid)
      .child("notifications")
      .push()
      .set({
        title: `${
          jobDescription.companyName
          } has declined your application for ${jobDescription.title}.`,
        link: `/job/${jobId}`,
        read: false,
        time: new Date().getTime()
      });
  };

  /**
   * Handles the accept of an applicant.
   * @param uid
   */
  acceptApplicant = uid => {
    const {appliedPhotographers} = this.state;
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
    const {jobId, acceptedApplicant, jobDescription} = this.state;
    this.database
      .ref("requests")
      .child(jobId)
      .update({
        phootgrapher: acceptedApplicant,
        payment: "down payment done",
        status: "in progress"
      })
      .then(() => {
        this.setState({downPayment: true});

        this.database.ref("users").child(acceptedApplicant.uid).child("notifications")
          .push().set({
          title: `${jobDescription.companyName} has accepted you to execute the job request "${jobDescription.title}".`,
          link: `/job/${jobId}`,
          read: false,
          time: new Date().getTime()
        })
          .then(() => this.props.history.replace(`/progress-job/${jobId}`));
      });

  };

  render() {
    const {
      jobDescription,
      appliedPhotographers,
      acceptedApplicant,
      downPayment
    } = this.props;
    console.log(appliedPhotographers);
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
