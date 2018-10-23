import React from 'react';
import fire from '../../config/Fire';
import {SingleJobViewWithNav} from '../../components/single-job/SingleJobView';
import LoadingPage from '../../components/LoadingPage';

export default class SingleJob extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.loading === false ? (
            <SingleJobFetch {...this.props}/>
          ) : (
            <LoadingPage/>
          )
        }
      </div>
    )
  }
}

class SingleJobFetch extends React.Component {
  state = {
    jobId: this.props.match.params.jobid,
    jobDescription: null,
    loadingData: true,
    userApplied: false,
    appliedPhotographers: [],
    acceptedApplicant: "",
    downPayment: false,
    isDeclinedPhotographer: false
  };
  database = fire.database();

  componentDidMount() {
    this.fetchDatabaseInfo(this.props.match.params.jobid);
    this.setEventListensers();
  }

  componentWillReceiveProps(nextProps) {
    this.fetchDatabaseInfo(nextProps.match.params.jobid);
  }

  /**
   * Fetches information about the job from the database.
   */
  fetchDatabaseInfo = (jobId) => {
    const {user} = this.props;
    this.database
      .ref('requests')
      .child(jobId)
      .once('value', (snap) => {
        const response = snap.val();
        const photographersObj = response["photographers-applied"] ? response["photographers-applied"] : [];
        let appliedPhotographers = Object.keys(photographersObj).map(key => {
          let photographer = photographersObj[key];
          return {
            uid: key,
            ...photographer
          };
        });
        this.setState(() => ({
          jobId: jobId,
          jobDescription: response,
          userApplied: (user ? photographersObj.hasOwnProperty(user.uid) : false),
          loadingData: false,
          appliedPhotographers: appliedPhotographers,
          acceptedApplicant: response.phootgrapher,
          downPayment: response.payment === "down payment done",
        }), () => this.userIsDeclinedPhotographer());
      }).catch(err => console.log(err))
  };

  /**
   * Sets event listeners for changes in the database.
   */
  setEventListensers = () => {
    const {jobId, appliedPhotographers} = this.state;
    let appliedPhotographersCopy = [...appliedPhotographers];

    // Event listener if applicant was added
    this.database.ref('requests').child(jobId).child('photographers-applied')
      .on('child_added', snap => {
        let data = snap.val();
        appliedPhotographersCopy.push({
          uid: snap.key,
          displayName: data.displayName,
          email: data.email
        });
        this.setState({appliedPhotographers: appliedPhotographersCopy});
      });
  };

  // ---------- COMPANY METHODS ----------:

  /**
   * Removes applicant from the current job.
   *
   * @param uid
   */
  declineApplicant = uid => {
    const {jobId, jobDescription} = this.state;
    // remove applicant from database and state
    this.database.ref('requests').child(jobId)
      .child('photographers-applied').child(uid).remove()
      .then(() => {
        let appliedPhotographersCopy = [...this.state.appliedPhotographers];
        let index = appliedPhotographersCopy.findIndex(photo => photo.uid === uid);
        appliedPhotographersCopy.splice(index, 1);
        this.setState({appliedPhotographers: appliedPhotographersCopy});
      });
    // add notification
    this.database.ref('users').child(uid).child('notifications').push().set({
      title: `${jobDescription.companyName} has declined your application for ${jobDescription.title}.`,
      link: `/job/${jobId}`,
      read: false,
      time: new Date().toLocaleDateString("en-US")
    });
  };

  /**
   * Handles the accept of an applicant.
   * @param uid
   */
  acceptApplicant = uid => {
    const {appliedPhotographers} = this.state;
    const photographer = appliedPhotographers.filter(user => user.uid === uid)[0];
    this.setState({acceptedApplicant: photographer});
  };

  /**
   * Setting photographer for the job request after
   * successful payment.
   */
  successfulPayment = () => {
    const {jobId, acceptedApplicant, jobDescription} = this.state;
    this.database.ref('requests').child(jobId).update({
      phootgrapher: acceptedApplicant,
      payment: "down payment done",
      status: "in progress"
    }).then(() => {
      this.setState({downPayment: true});
    });
    this.database.ref('users').child(acceptedApplicant.uid).child('notifications').push().set({
      title: `${jobDescription.companyName} has accepted you to execute the job request "${jobDescription.title}".`,
      link: `/job/${jobId}`,
      read: false,
      time: new Date().toLocaleDateString("en-US")
    });
  };

  // ---------- PHOTOGRAPHERS METHODS ----------:

  /**
   * User applies for a job.
   */
  applyForJob = () => {
    const {user} = this.props;
    const {jobId, jobDescription} = this.state;
    this.database
      .ref('requests').child(jobId).child('photographers-applied')
      .child(user.uid)
      .set({
        email: user.email,
        displayName: user.displayName
      })
      .then(() => {
        this.database
          .ref('photographer').child(user.uid).child('applied-jobs')
          .child(jobId)
          .set({
            jobDescription
          })
      })
      .then(() => {
        this.setState({userApplied: true});
        // creates notification for company
        this.database.ref('users').child(jobDescription.companyId)
          .child('notifications').push().set({
          title: `${user.displayName} applied for your job request "${jobDescription.title}".`,
          link: `/job/${jobId}`,
          read: false,
          time: new Date().toLocaleDateString("en-US")
        });
      });
  };

  /**
   * Checks, if user has already applied to the job and has been declined.
   */
  userIsDeclinedPhotographer() {
    const {user} = this.props;
    if (user.type === "photographer") {
      this.database.ref("photographer").child(user.uid).child("applied-jobs")
        .child(this.state.jobId).once('value', snap => {
        this.setState({isDeclinedPhotographer: snap.exists()});
      })
    }
  }

  render() {
    const {user} = this.props;
    const {
      loadingData, jobDescription, userApplied, appliedPhotographers,
      acceptedApplicant, downPayment, isDeclinedPhotographer
    } = this.state;
    return (
      <div>
        {
          loadingData ? (
            <LoadingPage/>
          ) : (
            <SingleJobViewWithNav
              history={this.props.history}
              {...jobDescription}
              user={user}
              applyHandler={this.applyForJob}
              userApplied={userApplied}
              appliedPhotographers={appliedPhotographers}
              acceptHandler={this.acceptApplicant}
              declineHandler={this.declineApplicant}
              acceptedApplicant={acceptedApplicant}
              downPayment={downPayment}
              successfulPaymentHandler={this.successfulPayment}
              isDeclinedPhotographer={isDeclinedPhotographer}
            />
          )
        }
      </div>
    )
  }
}