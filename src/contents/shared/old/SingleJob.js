import React from "react";
import fire from "../../../config/Fire";
import {SingleJobViewWithNav} from "../../../components/single-job/old/SingleJobView";
import LoadingPage from "../../../components/LoadingPage";
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default class SingleJob extends React.Component {
  render() {
    return (
      <div>
        {this.props.loading === false ? (
          <SingleJobFetch {...this.props} />
        ) : (
          <LoadingPage/>
        )}
      </div>
    );
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
    isDeclinedPhotographer: false,
    showDeleteModal: false,
    jobExists: true,
    submittedWork: [],
    acceptedWork: false
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
  fetchDatabaseInfo = jobId => {
    const {user} = this.props;
    this.database
      .ref("requests")
      .child(jobId)
      .once("value", async snap => {
        // checks, if job exists
        if (!snap.exists()) {
          await this.setState({jobExists: false, loadingData: false,});
          return -1;
        }
        const response = snap.val();
        const photographersObj = response["photographers-applied"]
          ? response["photographers-applied"]
          : [];
        let appliedPhotographers = Object.keys(photographersObj).map(key => {
          let photographer = photographersObj[key];
          return {
            uid: key,
            ...photographer
          };
        });
        const workObj = response["submitted-work"] ? response["submitted-work"] : [];
        this.setState(
          () => ({
            jobId: jobId,
            jobDescription: response,
            userApplied: user
              ? photographersObj.hasOwnProperty(user.uid)
              : false,
            loadingData: false,
            appliedPhotographers: appliedPhotographers,
            acceptedApplicant: response.phootgrapher,
            downPayment: response.payment === "down payment done",
            submittedWork: Object.values(workObj),
            acceptedWork: response.status === "closed"
          }),
          () => this.userIsDeclinedPhotographer()
        );
      })
      .catch(err => console.log(err));
  };

  /**
   * Sets event listeners for changes in the database.
   */
  setEventListensers = () => {
    const {jobId, appliedPhotographers} = this.state;
    let appliedPhotographersCopy = [...appliedPhotographers];

    // Event listener if applicant was added
    this.database
      .ref("requests")
      .child(jobId)
      .child("photographers-applied")
      .on("child_added", snap => {
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
   * Downloads zip file of submitted work.
   */
  downloadWork = () => {
    const {submittedWork} = this.state;
    let filesToDownload = [];
    //
    submittedWork.forEach(file => {
      // pushes Promise for download data to array
      filesToDownload.push(this.downloadURLAsAPromise(file.url));
      console.log(filesToDownload);
    });
    Promise.all(filesToDownload).then(values => {
      // create new zip file
      let zip = new JSZip();
      // add every value to the zip
      for(let i = 0; i < values.length; i++)
        zip.file(`submitted-work/${submittedWork[i].id}.jpg`, values[i]);

      zip.generateAsync({type: "blob"}).then(content => {
        // provides zip file for download
        FileSaver.saveAs(content, "download.zip");
      });
    });
  };

  /**
   * Creates Promise with the download data for current url.
   *
   * @param url
   * @returns {Promise}
   */
  downloadURLAsAPromise = url => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = "blob";
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(new Error("Ajax error for " + url + ": " + xhr.status));
          }
        }
      };
      xhr.send();
    });
  };

  acceptWork = () => {
    const {jobDescription, jobId, acceptedApplicant} = this.state;
    this.database
      .ref("requests")
      .child(jobId)
      .update({
        status: "closed"
      });
    // add notification
    this.database
      .ref("users")
      .child(acceptedApplicant.uid)
      .child("notifications")
      .push()
      .set({
        title: `${
          jobDescription.companyName
          } has accepted your submitted work for ${jobDescription.title}.`,
        link: `/job/${jobId}`,
        read: false,
        time: new Date().getTime()
      });
    this.setState({acceptedWork:true});
  };

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
    } catch(err) {
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
      });
    this.database.ref("users").child(acceptedApplicant.uid).child("notifications")
      .push().set({
        title: `${jobDescription.companyName} has accepted you to execute the job request "${jobDescription.title}".`,
        link: `/job/${jobId}`,
        read: false,
        time: new Date().getTime()
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
      .ref("requests")
      .child(jobId)
      .child("photographers-applied")
      .child(user.uid)
      .set({
        email: user.email,
        displayName: user.displayName
      })
      .then(() => {
        this.database
          .ref("photographer")
          .child(user.uid)
          .child("applied-jobs")
          .child(jobId)
          .set({
            jobDescription
          });
      })
      .then(() => {
        this.setState({userApplied: true});
        // creates notification for company
        this.database
          .ref("users")
          .child(jobDescription.companyId)
          .child("notifications")
          .push()
          .set({
            title: `${user.displayName} applied for your job request "${
              jobDescription.title
              }".`,
            link: `/job/${jobId}`,
            read: false,
            time: new Date().getTime()
          });
      });
  };

  /**
   * Checks, if user has already applied to the job and has been declined.
   */
  userIsDeclinedPhotographer() {
    const {user} = this.props;
    if (user.type === "photographer") {
      this.database
        .ref("photographer")
        .child(user.uid)
        .child("applied-jobs")
        .child(this.state.jobId)
        .once("value", snap => {
          this.setState({isDeclinedPhotographer: snap.exists()});
        });
    }
  }

  render() {
    const {user} = this.props;
    const {
      loadingData,
      jobDescription,
      userApplied,
      appliedPhotographers,
      acceptedApplicant,
      downPayment,
      isDeclinedPhotographer
    } = this.state;
    console.log(this.state.submittedWork);
    return (
      <div>
        {loadingData ? (
          <LoadingPage/>
        ) : (
            <SingleJobViewWithNav
              history={this.props.history}
              {...jobDescription}
              jobId={this.state.jobId}
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
              deleteHandler={this.deleteJob}
              showDeleteModal={this.showDeleteModal}
              showModal={this.state.showDeleteModal}
              jobExists={this.state.jobExists}
              submittedWork={this.state.submittedWork}
              acceptWorkHandler={this.acceptWork}
              downloadHandler={this.downloadWork}
              acceptedWork={this.state.acceptedWork}
            />
        )}
      </div>
    );
  }
}
